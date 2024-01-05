const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const TittyTwister = require("../../Schemas/Bullying/TittyTwister");
const images = require("../../Json/bullying/tittytwister.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tittytwister")
    .setDescription("Tag a user to twist their nipples.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let tittytwister = await TittyTwister.findOne({ userId: taggedUser.id });

      if (!tittytwister) {
        tittytwister = new TittyTwister({ userId: taggedUser.id });
      }

      tittytwister.tagCount++;
      await tittytwister.save();

      let description = `**${invokerUser.displayName}** twisted the nipples of **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** twisted their own nipples`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** nipples has been twisted **${tittytwister.tagCount}** times`,
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
