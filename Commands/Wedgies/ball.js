const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Ball = require("../../Schemas/Wedgies/Balls");
const images = require("../../Json/ball.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ball")
    .setDescription("Turns a loser into a ball using their own underwear.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let ball = await Ball.findOne({ userId: taggedUser.id });

      if (!ball) {
        ball = new Ball({ userId: taggedUser.id });
      }

      ball.tagCount++;
      await ball.save();

      let description = `**${invokerUser.displayName}** was converted into a ball by **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** turned theirvself into a ball`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been converted into a ball **${ball.tagCount}** times`,
        })
        .setImage(getRandomImage(images));

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error al guardar el usuario en la base de datos:", error);
      await interaction.reply(
        "An error occurred while processing the command."
      );
    }
  },
};
