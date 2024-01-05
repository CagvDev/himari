const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Noogie = require("../../Schemas/Bullying/Noogie");
const images = require("../../Json/bullying/noogie.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("noogie")
    .setDescription("Tag a user to rub your knuckles on a nerd's head.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let noogie = await Noogie.findOne({ userId: taggedUser.id });

      if (!noogie) {
        noogie = new Noogie({ userId: taggedUser.id });
      }

      noogie.tagCount++;
      await noogie.save();

      let description = `**${invokerUser.displayName}** gave a noogie to **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** gave a noogie to herself`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been given noogies **${noogie.tagCount}** times`,
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
