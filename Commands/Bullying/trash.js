const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Trash = require("../../Schemas/Bullying/Trash");
const fs = require("fs");

const images = require("../../Json/bullying/trash.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trash")
    .setDescription("Tag a user to throw them headfirst into the trash.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    let interactionResponded = false;
    if (interactionResponded) {
      console.log("La interacción ya ha sido respondida.");
      return;
    }
    // ! Procesar la interacción y responder aquí
    interactionResponded = true;

    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let trash = await Trash.findOne({ userId: taggedUser.id });

      if (!trash) {
        trash = new Trash({ userId: taggedUser.id });
      }

      trash.tagCount++;
      await trash.save();

      let description = `**${invokerUser.displayName}** throws **${taggedUser.displayName}** headfirst into the garbage.`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** threw herself in the garbage`;
      }

      // ! Seleccionar aleatoriamente una imagen del array
      let randomImage;

      try {
        if (wedgieImages.length > 0) {
          randomImage =
            wedgieImages[Math.floor(Math.random() * wedgieImages.length)];
        } else {
          throw new Error("El array de imágenes está vacío.");
        }
      } catch (error) {
        console.error("Error al seleccionar la imagen:", error);
        randomImage = wedgieImages[0];
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been thrown into the garbagea **${trash.tagCount}** times`,
        })
        .setImage(randomImage);

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error al guardar el usuario en la base de datos:", error);
      await interaction.reply("Ha ocurrido un error al procesar el comando.");
    }
  },
};
