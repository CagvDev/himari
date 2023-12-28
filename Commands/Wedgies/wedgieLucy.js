const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const WedgieLucy = require("../../Schemas/Atomics");
const fs = require("fs");

const images = require("../../Json/wedgieLucy.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wedgielucy")
    .setDescription("Give stinky loser Lucy an atomic wedgie."),

  async execute(interaction) {
    let interactionResponded = false;
    if (interactionResponded) {
      console.log("La interacción ya ha sido respondida.");
      return;
    }
    // ! Procesar la interacción y responder aquí
    interactionResponded = true;

    const taggedUserId = "1112935727462875136";
    const invokerUser = interaction.member;

    try {
      // Fetch the member object using the user ID
      const taggedUser = await interaction.guild.members.fetch(taggedUserId);

      let wedgieLucy = await WedgieLucy.findOne({ userId: taggedUserId });

      if (!wedgieLucy) {
        wedgieLucy = new WedgieLucy({ userId: taggedUserId });
      }

      wedgieLucy.tagCount++;
      await wedgieLucy.save();

      let description = `**${invokerUser.displayName}** gave an atomic wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUserId) {
        description = `**${invokerUser.displayName}** gave herself an atomic wedgie`;
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
          value: `${description} \n**${taggedUser.displayName}** has received **${wedgieLucy.tagCount}** atomic wedgies`,
        })
        .setImage(randomImage);

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      if (error.code === 10007) {
        // Member not found
        console.error("Miembro no encontrado en el servidor.");
        await interaction.reply("Miembro no encontrado en el servidor.");
      } else {
        console.error("Error al procesar el comando:", error);
        await interaction.reply("Ha ocurrido un error al procesar el comando.");
      }
    }
  },
};
