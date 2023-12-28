const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Pantsing = require("../../Schemas/Bullying/Pantsing");
const fs = require("fs");

const images = require("../../Json/bullying/pantsing.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pantsing")
    .setDescription("Tag a user to pull down their pants.")
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
      let pantsing = await Pantsing.findOne({ userId: taggedUser.id });

      if (!pantsing) {
        pantsing = new Pantsing({ userId: taggedUser.id });
      }

      pantsing.tagCount++;
      await pantsing.save();

      let description = `**${invokerUser.displayName}** gave pulled down pants to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** pulled down their pants to themselves`;
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
          value: `${description} \n**${taggedUser.displayName}** has pulled down their pants **${pantsing.tagCount}** times`,
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
