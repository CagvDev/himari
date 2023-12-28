const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Ripping = require("../../Schemas/Rippings");
const fs = require("fs");

const images = require("../../Json/ripping.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ripping")
    .setDescription("Tag someone to rip their underwear.")
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
      let ripping = await Ripping.findOne({ userId: taggedUser.id });

      if (!ripping) {
        ripping = new Ripping({ userId: taggedUser.id });
      }

      ripping.tagCount++;
      await ripping.save();

      let description = `**${invokerUser.displayName}** has ripped the underwear of **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** ripped their own underwear`;
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
          value: `${description} \n**${taggedUser.displayName}** has had their underwear ripped **${ripping.tagCount}** times`,
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
