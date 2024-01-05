const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Trash = require("../../Schemas/Bullying/Trash");
const images = require("../../Json/bullying/trash.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trash")
    .setDescription("Tag a user to throw them headfirst into the trash.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let trash = await Trash.findOne({ userId: taggedUser.id });

      if (!trash) {
        trash = new Trash({ userId: taggedUser.id });
      }

      trash.tagCount++;
      await trash.save();

      let description = `**${invokerUser.displayName}** throws **${taggedUser.displayName}** headfirst into the garbage.`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** threw herself in the garbage`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been thrown into the garbagea **${trash.tagCount}** times`,
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
