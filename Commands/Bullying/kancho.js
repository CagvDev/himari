const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Kancho = require("../../Schemas/Bullying/Kancho");
const images = require("../../Json/bullying/kancho.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kancho")
    .setDescription("Tag a user to sink your fingers in their ass.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let kancho = await Kancho.findOne({ userId: taggedUser.id });

      if (!kancho) {
        kancho = new Kancho({ userId: taggedUser.id });
      }

      kancho.tagCount++;
      await kancho.save();

      let description = `**${invokerUser.displayName}** gave a kancho to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave a kancho to himself`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** have given kanchos **${kancho.tagCount}** times`,
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
