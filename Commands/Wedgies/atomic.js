const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Atomic = require("../../Schemas/Wedgies/Atomics");
const images = require("../../Json/atomic.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("atomic")
    .setDescription("Tag a user to give them an atomic wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let atomic = await Atomic.findOne({ userId: taggedUser.id });

      if (!atomic) {
        atomic = new Atomic({ userId: taggedUser.id });
      }

      atomic.tagCount++;
      await atomic.save();

      let description = `**${invokerUser.displayName}** gave an atomic wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave an atomic wedgie to herself`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has had their underwear on display **${atomic.tagCount}** times`,
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
