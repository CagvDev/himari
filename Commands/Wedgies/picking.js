const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Picking = require("../../Schemas/Wedgies/Pickings");
const images = require("../../Json/picking.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("picking")
    .setDescription("Tag a user to pick up their wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let picking = await Picking.findOne({ userId: taggedUser.id });

      if (!picking) {
        picking = new Picking({ userId: taggedUser.id });
      }

      picking.tagCount++;
      await picking.save();

      let description = `**${invokerUser.displayName}** pulls the underwear out of **${taggedUser.displayName}'s** ass`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** pulled the underwear out of their own ass.`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has picked **${picking.tagCount}** wedgies`,
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
