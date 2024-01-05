const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Locker = require("../../Schemas/Wedgies/Lockers");
const images = require("../../Json/locker.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("locker")
    .setDescription(
      "Tag a user to lock them in a locker and pull their underwear into a locker."
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let locker = await Locker.findOne({ userId: taggedUser.id });

      if (!locker) {
        locker = new Locker({ userId: taggedUser.id });
      }

      locker.tagCount++;
      await locker.save();

      let description = `**${invokerUser.displayName}** locked **${taggedUser.displayName}** in a locker`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** locked herself in a locker`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been locked in a locker **${locker.tagCount}** times.`,
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
