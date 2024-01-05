const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Mummy = require("../../Schemas/Wedgies/Mummies");
const images = require("../../Json/mummy.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mummy")
    .setDescription("Tag a user to give them a mummy wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let mummy = await Mummy.findOne({ userId: taggedUser.id });

      if (!mummy) {
        mummy = new Mummy({ userId: taggedUser.id });
      }

      mummy.tagCount++;
      await mummy.save();

      let description = `**${invokerUser.displayName}** gave a mummy wedgie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave a mummy wedgie to herself`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has received **${mummy.tagCount}** mummy wedgies`,
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
