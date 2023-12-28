const { loadCommands } = require("../../Handlers/commandHandler");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.username} se ha iniciado de forma correcta.`);

    client.user.setPresence({
      status: "online",
      activities: [
        {
          name: "with nerdy underwear",
          type: "PLAYING",
        },
      ],
    });

    await mongoose.connect(config.mongopass, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log("El bot se ha conectado a la base de datos.");
    }

    console.log("El bot está conectado a los siguientes servidores:");
    client.guilds.cache.forEach((guild) => {
      console.log(guild.name);
    });

    loadCommands(client);
  },
};
