const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const SockGag = require("../../Schemas/Bullying/SockGag");
const images = require("../../Json/bullying/sockGag.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sockgag")
    .setDescription(
      "Tag a user to put a sock (maybe clean, maybe not) in their mouth as a gag."
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let sockGag = await SockGag.findOne({ userId: taggedUser.id });

      if (!sockGag) {
        sockGag = new SockGag({ userId: taggedUser.id });
      }

      sockGag.tagCount++;
      await sockGag.save();

      let description = `**${invokerUser.displayName}** used a sock as a gag for **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** used a sock as a gag for theirself`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has had a sock as a gag **${sockGag.tagCount}** times`,
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
