const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const SqueakyClean = require("../../Schemas/Wedgies/SqueakyCleans");
const images = require("../../Json/squakyclean.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("squeakyclean")
    .setDescription("Tag a user to give them a squeaky clean wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let squeakyclean = await SqueakyClean.findOne({ userId: taggedUser.id });

      if (!squeakyclean) {
        squeakyclean = new SqueakyClean({ userId: taggedUser.id });
      }

      squeakyclean.tagCount++;
      await squeakyclean.save();

      let description = `**${invokerUser.displayName}** gave a squeaky clean wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave herself a squeaky clean wedgie`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received **${squeakyclean.tagCount}** squeaky clean wedgies`,
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
