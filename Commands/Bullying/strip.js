const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Strip = require("../../Schemas/Bullying/Strip");
const fs = require("fs");

const images = require("../../Json/bullying/strip.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("strip")
    .setDescription("Tag a user to steal all their clothes.")
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
      let strip = await Strip.findOne({ userId: taggedUser.id });

      if (!strip) {
        strip = new Strip({ userId: taggedUser.id });
      }

      strip.tagCount++;
      await strip.save();

      let description = `**${invokerUser.displayName}** stole **${taggedUser.displayName}'s** clothes `;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** hid their own clothes`;
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
          value: `${description} \n**${taggedUser.displayName}** have had their clothes stolen **${strip.tagCount}** times`,
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
