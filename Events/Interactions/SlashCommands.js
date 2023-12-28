const { ChatInputCommandInteraction, Client } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    if (!client.commands.has(interaction.commandName))
      return interaction.reply({
        content: "Este comando no está cargado.",
        ephemeral: true,
      });

    const command = client.commands.get(interaction.commandName);

    if (command.developer && interaction.user.id !== "811291265756037131")
      return interaction.reply({
        content: "Este comando es solo para el desarrollador.",
        ephemeral: true,
      });

    const logMessage = `Comando '${interaction.commandName}' usado por ${
      interaction.member.displayName
    } ${
      interaction.options.getMember("user")
        ? `hacia ${interaction.options.getMember("user").displayName}`
        : ""
    } en el servidor ${interaction.guild.name}`;

    // Imprime en la consola
    console.log(logMessage);

    try {
      // Envia la información al webhook antes de ejecutar el comando
      const webhookUrl =
        "https://discord.com/api/webhooks/1173817759914803222/0GD7WDJc5To9EPjOWSzMZgoX4sUuJw7Gt6LCjBzt_dA4IF_l0IViLQ2L6TmszWd6nCKi";

      await axios.post(webhookUrl, { content: logMessage });

      // Call command.execute without await to prevent double acknowledgment
      command.execute(interaction, client);
    } catch (error) {
      console.error("Error al enviar a webhook o ejecutar comando:", error);
    }
  },
};
