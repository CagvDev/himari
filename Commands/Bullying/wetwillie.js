const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const WetWillie = require("../../Schemas/Bullying/WetWillie");
const fs = require("fs");

const images = require("../../Json/bullying/wetwillie.json");

const wedgieImages = images.wedgies;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wetwillie")
    .setDescription("Tag a user to stick saliva-filled fingers in the ear.")
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
      let wetwillie = await WetWillie.findOne({ userId: taggedUser.id });

      if (!wetwillie) {
        wetwillie = new WetWillie({ userId: taggedUser.id });
      }

      wetwillie.tagCount++;
      await wetwillie.save();

      let description = `**${invokerUser.displayName}** stuck their fingers in the ears of **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** put their fingers in their ears`;
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
          value: `${description} \n**${taggedUser.displayName}** fingers has been sticking in their ears **${wetwillie.tagCount}** times`,
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
