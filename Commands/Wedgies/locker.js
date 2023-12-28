const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Locker = require("../../Schemas/Lockers");
const fs = require("fs");

const images = require("../../Json/locker.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("locker")
    .setDescription(
      "Tag a user to lock them in a locker and pull their underwear into a locker."
    )
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
      let locker = await Locker.findOne({ userId: taggedUser.id });

      if (!locker) {
        locker = new Locker({ userId: taggedUser.id });
      }

      locker.tagCount++;
      await locker.save();

      let description = `**${invokerUser.displayName}** locked **${taggedUser.displayName}** in a locker`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** locked herself in a locker`;
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
          value: `${description} \n**${taggedUser.displayName}** has been locked in a locker **${locker.tagCount}** times.`,
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
