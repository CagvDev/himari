const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const WedgieLucy = require("../../Schemas/Wedgies/Atomics");
const images = require("../../Json/wedgieLucy.json");
const { getRandomImage } = require("../../Functions/imageLoader");

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

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received **${wedgieLucy.tagCount}** atomic wedgies`,
        })
        .setImage(getRandomImage(images));

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      if (error.code === 10007) {
        // Member not found
        console.error("Miembro no encontrado en el servidor.");
        await interaction.reply("Member not found on the server.");
      } else {
        console.error("Error al procesar el comando:", error);
        await interaction.reply(
          "An error occurred while processing the command."
        );
      }
    }
  },
};
