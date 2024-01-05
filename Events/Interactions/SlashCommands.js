const { ChatInputCommandInteraction, Client } = require("discord.js");
const axios = require("axios");

/**
 * Maneja respuestas efímeras.
 * @param {ChatInputCommandInteraction} interaction
 * @param {string} content
 */
async function handleEphemeralReply(interaction, content) {
  await interaction.reply({
    content,
    ephemeral: true,
  });
}

/**
 * Registra información en la consola de manera centralizada.
 * @param {string} logMessage
 */
function logToConsole(logMessage) {
  // Imprime en la consola
  console.log(logMessage);
}

module.exports = {
  name: "interactionCreate",
  /**
   * Maneja las interacciones de comandos slash.
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    if (!client.commands.has(interaction.commandName)) {
      return handleEphemeralReply(interaction, "Este comando no está cargado.");
    }

    const command = client.commands.get(interaction.commandName);

    if (command.developer && interaction.user.id !== "811291265756037131") {
      return handleEphemeralReply(
        interaction,
        "Este comando es solo para el desarrollador."
      );
    }

    const targetMember = interaction.options.getMember("user");
    const targetDisplayName = targetMember
      ? `hacia ${targetMember.displayName}`
      : "";
    const logMessage = `Comando '${interaction.commandName}' usado por ${interaction.member.displayName} ${targetDisplayName} en el servidor ${interaction.guild.name}`;

    // Centraliza la lógica de registro en la consola
    logToConsole(logMessage);

    try {
      // Envia la información al webhook antes de ejecutar el comando
      const webhookUrl =
        "https://discord.com/api/webhooks/1173817759914803222/0GD7WDJc5To9EPjOWSzMZgoX4sUuJw7Gt6LCjBzt_dA4IF_l0IViLQ2L6TmszWd6nCKi";

      await axios.post(webhookUrl, { content: logMessage });

      // Llama a command.execute sin await para evitar doble confirmación
      command.execute(interaction, client);
    } catch (webhookError) {
      console.error("Error al enviar a webhook:", webhookError);
      // Maneja el error específico al enviar al webhook
      return handleEphemeralReply(
        interaction,
        "Error al registrar la interacción. Por favor, inténtalo de nuevo."
      );
    }
  },
};
