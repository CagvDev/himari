const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Crab = require("../../Schemas/Wedgies/Crabs");
const images = require("../../Json/crab.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crab")
    .setDescription("Give a nerd an extreme wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let crab = await Crab.findOne({ userId: taggedUser.id });

      if (!crab) {
        crab = new Crab({ userId: taggedUser.id });
      }

      crab.tagCount++;
      await crab.save();

      let description = `**${invokerUser.displayName}** has given an extreme wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave theirself an extreme wedgie`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received extreme wedgies **${crab.tagCount}** times`,
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
