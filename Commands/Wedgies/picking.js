const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Picking = require("../../Schemas/Pickings");
const fs = require("fs");

const images = require("../../Json/picking.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("picking")
    .setDescription("Tag a user to pick up their wedgie.")
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
      let picking = await Picking.findOne({ userId: taggedUser.id });

      if (!picking) {
        picking = new Picking({ userId: taggedUser.id });
      }

      picking.tagCount++;
      await picking.save();

      let description = `**${invokerUser.displayName}** pulls the underwear out of **${taggedUser.displayName}'s** ass`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** pulled the underwear out of their own ass.`;
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
          value: `${description} \n**${taggedUser.displayName}** has picked **${picking.tagCount}** wedgies`,
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
