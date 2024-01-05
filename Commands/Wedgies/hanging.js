const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Hanging = require("../../Schemas/Wedgies/Hangings");
const images = require("../../Json/hanging.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hanging")
    .setDescription("Tag a user to give them a hanging wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let hanging = await Hanging.findOne({ userId: taggedUser.id });

      if (!hanging) {
        hanging = new Hanging({ userId: taggedUser.id });
      }

      hanging.tagCount++;
      await hanging.save();

      let description = `**${invokerUser.displayName}** gave a hanging wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave herself a hanging wedgie`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received **${hanging.tagCount}** hanging wedgies`,
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
