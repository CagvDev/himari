async function loadEvents(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Events", "Status");

  await client.events.clear();

  const Files = await loadFiles("Events");

  try {
    await Promise.all(
      Files.map(async (file) => {
        const event = require(file);
        await addEvent(client, event, table);
      })
    );

    console.log(table.toString());
  } catch (error) {
    console.error("Error al cargar eventos:", error);
  }
}

async function addEvent(client, event, table) {
  const execute = (...args) => event.execute(...args, client);
  client.events.set(event.name, execute);

  if (event.rest) {
    if (event.once) client.rest.once(event.name, execute);
    else client.rest.on(event.name, execute);
  } else {
    if (event.once) client.once(event.name, execute);
    else client.on(event.name, execute);
  }

  table.addRow(event.name, "🟢");
}

module.exports = { loadEvents };
