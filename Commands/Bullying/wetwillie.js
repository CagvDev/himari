const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const WetWillie = require("../../Schemas/Bullying/WetWillie");
const images = require("../../Json/bullying/wetwillie.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wetwillie")
    .setDescription("Tag a user to stick saliva-filled fingers in the ear.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let wetwillie = await WetWillie.findOne({ userId: taggedUser.id });

      if (!wetwillie) {
        wetwillie = new WetWillie({ userId: taggedUser.id });
      }

      wetwillie.tagCount++;
      await wetwillie.save();

      let description = `**${invokerUser.displayName}** stuck their fingers in the ears of **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** put their fingers in their ears`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** fingers has been sticking in their ears **${wetwillie.tagCount}** times`,
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
