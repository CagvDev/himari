const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Frontal = require("../../Schemas/Wedgies/Frontals");
const images = require("../../Json/frontal.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("frontal")
    .setDescription("Tag a user to give them a front wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let frontal = await Frontal.findOne({ userId: taggedUser.id });

      if (!frontal) {
        frontal = new Frontal({ userId: taggedUser.id });
      }

      frontal.tagCount++;
      await frontal.save();

      let description = `**${invokerUser.displayName}** gave a front wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave a front wedgie to herself`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received **${frontal.tagCount}** frontal wedgies`,
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
