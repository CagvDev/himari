const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Swirly = require("../../Schemas/Bullying/Swirly");
const images = require("../../Json/bullying/swirly.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("swirly")
    .setDescription("Tag a user to dunk their face in the toilet.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let swirly = await Swirly.findOne({ userId: taggedUser.id });

      if (!swirly) {
        swirly = new Swirly({ userId: taggedUser.id });
      }

      swirly.tagCount++;
      await swirly.save();

      let description = `**${invokerUser.displayName}** dunked **${taggedUser.displayName}'s** face in the toilet`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** dunks herself in the toilet`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been dunked **${swirly.tagCount}** times`,
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
