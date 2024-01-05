const { loadCommands } = require("../../Handlers/commandHandler");
const config = require("../../config.json");
const mongoose = require("mongoose");
const ascii = require("ascii-table");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.username} se ha iniciado de forma correcta.`);

    client.user.setPresence({
      activities: [{ name: "with your underwear" }],
      status: "online",
    });

    try {
      await mongoose.connect(config.mongopass, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("El bot se ha conectado a la base de datos.");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }

    const table = new ascii("Servidores conectados");
    client.guilds.cache.forEach((guild) => {
      table.addRow(guild.name);
    });
    console.log(table.toString());

    await loadCommands(client);
  },
};
