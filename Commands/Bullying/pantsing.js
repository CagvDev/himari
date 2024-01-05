const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Pantsing = require("../../Schemas/Bullying/Pantsing");
const images = require("../../Json/bullying/pantsing.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pantsing")
    .setDescription("Tag a user to pull down their pants.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let pantsing = await Pantsing.findOne({ userId: taggedUser.id });

      if (!pantsing) {
        pantsing = new Pantsing({ userId: taggedUser.id });
      }

      pantsing.tagCount++;
      await pantsing.save();

      let description = `**${invokerUser.displayName}** gave pulled down pants to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** pulled down their pants to themselves`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has pulled down their pants **${pantsing.tagCount}** times`,
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
