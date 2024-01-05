const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Spanking = require("../../Schemas/Bullying/Spanking");
const images = require("../../Json/bullying/spanking.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spanking")
    .setDescription("Tag a user to spank them.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let spanking = await Spanking.findOne({ userId: taggedUser.id });

      if (!spanking) {
        spanking = new Spanking({ userId: taggedUser.id });
      }

      spanking.tagCount++;
      await spanking.save();

      let description = `**${invokerUser.displayName}** has given **${taggedUser.displayName}** a spanking`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** spanked themselves`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has been spanked **${spanking.tagCount}** times`,
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
