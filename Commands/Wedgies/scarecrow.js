const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Scarecrow = require("../../Schemas/Scarecrows");
const fs = require("fs");

const images = require("../../Json/scarecrow.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("scarecrow")
    .setDescription("Tag a user to give them a scarecrow wedgie.")
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
      let scarecrow = await Scarecrow.findOne({ userId: taggedUser.id });

      if (!scarecrow) {
        scarecrow = new Scarecrow({ userId: taggedUser.id });
      }

      scarecrow.tagCount++;
      await scarecrow.save();

      let description = `**${invokerUser.displayName}** gave a scarecrow wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave a scarecrow wedgie to herself`;
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
          value: `${description} \n**${taggedUser.displayName}** has received **${scarecrow.tagCount}** scarecrow wedgies`,
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
