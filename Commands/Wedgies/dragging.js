const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Dragging = require("../../Schemas/Wedgies/Draggings");
const images = require("../../Json/dragging.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dragging")
    .setDescription("Tag someone to drag them by their underwear.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let dragging = await Dragging.findOne({ userId: taggedUser.id });

      if (!dragging) {
        dragging = new Dragging({ userId: taggedUser.id });
      }

      dragging.tagCount++;
      await dragging.save();

      let description = `**${invokerUser.displayName}** gives a dragging wedgie **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** drag themself in a wedgie`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received dragging wedgies **${dragging.tagCount}** times`,
        })
        .setImage(getRandomImage(images));

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error al guardar el usuario en la base de datos:", error);
      await interaction.reply("Ha ocurrido un error al procesar el comando.");
    }
  },
};
