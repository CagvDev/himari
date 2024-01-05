const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Flagpole = require("../../Schemas/Wedgies/Flagpoles");
const images = require("../../Json/flagpole.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flagpole")
    .setDescription("Tag a user to hang them by their underwear on the flag.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let flagpole = await Flagpole.findOne({ userId: taggedUser.id });

      if (!flagpole) {
        flagpole = new Flagpole({ userId: taggedUser.id });
      }

      flagpole.tagCount++;
      await flagpole.save();

      let description = `**${invokerUser.displayName}** hung from their underwear as a flag to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** hung herself as a flag`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been hanging **${flagpole.tagCount}** times as a flag`,
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
