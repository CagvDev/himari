const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Wedgie = require("../../Schemas/Wedgies/Wedgies");
const images = require("../../Json/wedgie.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wedgie")
    .setDescription("Tag a user to give them a wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let wedgie = await Wedgie.findOne({ userId: taggedUser.id });

      if (!wedgie) {
        wedgie = new Wedgie({ userId: taggedUser.id });
      }

      wedgie.tagCount++;
      await wedgie.save();

      let description = `**${invokerUser.displayName}** gave a wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave herself a wedgie`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received **${wedgie.tagCount}** wedgies`,
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
