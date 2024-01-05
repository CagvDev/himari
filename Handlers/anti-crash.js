const { EmbedBuilder, WebhookClient } = require("discord.js");
const { inspect } = require("util");

const embed = new EmbedBuilder().setColor("Red");
const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1145534584046506065/8NTMkqcN-5xq2J6alOgK_McvXkI4p9fFiEOzFn7aiXBUytb2GpbvUn1SvgQxL08uVicV",
});

module.exports = (client) => {
  client.on("error", (err) => handleError("Discord API error", err));

  process.on("unhandledRejection", (reason, promise) => {
    handleError("Unhandled Rejection/Catch", reason, promise);
  });

  process.on("uncaughtException", (err, origin) => {
    handleError("Uncaught Exception", err, origin);
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    handleError("Uncaught Exception Monitor", err, origin);
  });

  process.on("warning", (warn) => handleError("Warning", warn));
};

function handleError(title, error, additionalInfo) {
  console.log(error, "\n", additionalInfo);

  const formattedError = inspect(error, { depth: 0 }).slice(0, 1000);
  const formattedAdditionalInfo = inspect(additionalInfo, { depth: 0 }).slice(
    0,
    1000
  );

  embed
    .setTitle(title)
    .setURL(
      `https://nodejs.org/api/process.html#event-${title
        .toLowerCase()
        .replace(/ /g, "")
        .replace("/", "")}`
    )
    .addFields(
      { name: "Error", value: `\`\`\`${formattedError}\`\`\`` },
      {
        name: "Additional Info",
        value: `\`\`\`${formattedAdditionalInfo}\`\`\``,
      }
    )
    .setTimestamp();

  return webhook.send({ embeds: [embed] });
}
