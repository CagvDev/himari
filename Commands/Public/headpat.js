const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("headpat")
    .setDescription("Congratulate the cute bot."),

  async execute(interaction) {
    try {
      const descriptions = [
        "You pat Himari on her head, but she looks at you with **disdain** and **laughs**.",
        "You pat Himari on her head, embarrassed she **pulls** her own panties over her face. Her **atomic wedgie** covers her shame..",
        "You pat Himari on her head, she responds with a **warm smile**.",
        "You pat Himari on her head, she decides to **headpat you** in **return**.",
        "You pat Himari on her head, minutes later you **find yourself** trapped in an **atomic wedgie** given to you by Himari.",
      ];

      const randomIndex = Math.floor(Math.random() * descriptions.length);
      const randomDescription = descriptions[randomIndex];

      const embed = new EmbedBuilder().setColor("Random").addFields({
        name: " ",
        value: `${randomDescription}`,
      });

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error al procesar el comando:", error);
      await interaction.reply(
        "An error occurred while processing the command."
      );
    }
  },
};
