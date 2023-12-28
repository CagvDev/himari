const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const SqueakyClean = require("../../Schemas/SqueakyCleans");
const fs = require("fs");

const images = require("../../Json/squakyclean.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("squeakyclean")
    .setDescription("Tag a user to give them a squeaky clean wedgie.")
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
      let squeakyclean = await SqueakyClean.findOne({ userId: taggedUser.id });

      if (!squeakyclean) {
        squeakyclean = new SqueakyClean({ userId: taggedUser.id });
      }

      squeakyclean.tagCount++;
      await squeakyclean.save();

      let description = `**${invokerUser.displayName}** gave a squeaky clean wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave herself a squeaky clean wedgie`;
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
          value: `${description} \n**${taggedUser.displayName}** has received **${squeakyclean.tagCount}** squeaky clean wedgies`,
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
