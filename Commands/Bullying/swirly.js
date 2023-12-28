const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Swirly = require("../../Schemas/Bullying/Swirly");
const fs = require("fs");

const images = require("../../Json/bullying/swirly.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("swirly")
    .setDescription("Tag a user to dunk their face in the toilet.")
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
      let swirly = await Swirly.findOne({ userId: taggedUser.id });

      if (!swirly) {
        swirly = new Swirly({ userId: taggedUser.id });
      }

      swirly.tagCount++;
      await swirly.save();

      let description = `**${invokerUser.displayName}** dunked **${taggedUser.displayName}'s** face in the toilet`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** dunks herself in the toilet`;
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
          value: `${description} \n**${taggedUser.displayName}** has been dunked **${swirly.tagCount}** times`,
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
