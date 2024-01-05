async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();

  const Files = await loadFiles("Commands");

  let commandsArray = [];

  try {
    commandsArray = await Promise.all(
      Files.map(async (file) => {
        const command = require(file);
        return addCommand(client, command, table);
      })
    );
  } catch (error) {
    console.error("Error al cargar comandos:", error);
  }

  client.application.commands.set(commandsArray);

  console.log(table.toString());
}

async function addCommand(client, command, table) {
  client.commands.set(command.data.name, command);
  table.addRow(command.data.name, "🟢");
  return command.data.toJSON();
}

module.exports = { loadCommands };
