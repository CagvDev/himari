const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Aftermath = require("../../Schemas/Wedgies/Aftermaths");
const images = require("../../Json/aftermath.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aftermath")
    .setDescription("Tag yourself or a user to show their pulled underwear.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let aftermath = await Aftermath.findOne({ userId: taggedUser.id });

      if (!aftermath) {
        aftermath = new Aftermath({ userId: taggedUser.id });
      }

      aftermath.tagCount++;
      await aftermath.save();

      let description = `**${invokerUser.displayName}** showed the stretched underwear of **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** showed their stretched underwear`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has had their underwear on display **${aftermath.tagCount}** times`,
        })
        .setImage(getRandomImage(images));

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
