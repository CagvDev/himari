const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Messy = require("../../Schemas/Wedgies/Messies");
const images = require("../../Json/messy.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("messy")
    .setDescription("Tag a user to give them a messy wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let messy = await Messy.findOne({ userId: taggedUser.id });

      if (!messy) {
        messy = new Messy({ userId: taggedUser.id });
      }

      messy.tagCount++;
      await messy.save();

      let description = `**${invokerUser.displayName}** gave a messy wedgie to**${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave a dirty wedgie to herself`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received **${messy.tagCount}** messy wedgies`,
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
