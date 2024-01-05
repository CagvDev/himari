const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Strip = require("../../Schemas/Bullying/Strip");
const images = require("../../Json/bullying/strip.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("strip")
    .setDescription("Tag a user to steal all their clothes.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let strip = await Strip.findOne({ userId: taggedUser.id });

      if (!strip) {
        strip = new Strip({ userId: taggedUser.id });
      }

      strip.tagCount++;
      await strip.save();

      let description = `**${invokerUser.displayName}** stole **${taggedUser.displayName}'s** clothes `;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** hid their own clothes`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** have had their clothes stolen **${strip.tagCount}** times`,
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
