const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Kiss = require("../../Schemas/Wedgies/Kisses");
const images = require("../../Json/kiss.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription(
      "Tag a nerd to give them a wedgie while you give them a kiss."
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let kiss = await Kiss.findOne({ userId: taggedUser.id });

      if (!kiss) {
        kiss = new Kiss({ userId: taggedUser.id });
      }

      kiss.tagCount++;
      await kiss.save();

      let description = `**${invokerUser.displayName}** kisses **${taggedUser.displayName}** while pulling their underwear.`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** you can't kiss yourself, loser.
        I will give you the image just for pity.`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received wedgies and kisses **${kiss.tagCount}** times.`,
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
