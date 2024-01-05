const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Centaur = require("../../Schemas/Wedgies/Centaurs");
const images = require("../../Json/centaur.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("centaur")
    .setDescription("Tag two nerds to make them a centaur wedgie.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user2").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const taggedUser2 = interaction.options.getMember("user2");
    const invokerUser = interaction.member;

    try {
      let centaur1 = await Centaur.findOne({ userId: taggedUser.id });
      let centaur2 = await Centaur.findOne({ userId: taggedUser2.id });

      if (!centaur1) {
        centaur1 = new Centaur({ userId: taggedUser.id });
      }

      if (!centaur2) {
        centaur2 = new Centaur({ userId: taggedUser2.id });
      }

      centaur1.tagCount++;
      centaur2.tagCount++;

      await centaur1.save();
      await centaur2.save();

      let description = `**${invokerUser.displayName}** put **${taggedUser.displayName}** and **${taggedUser2.displayName}** in a centaur wedgie`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** put herself and **${taggedUser2.displayName}** in a centaur wedgie`;
      } else if (invokerUser.id === taggedUser2.id) {
        description = `**${invokerUser.displayName}** put herself and **${taggedUser.displayName}** in a centaur wedgie`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** and **${taggedUser2.displayName}** has been in a centaur wedgie **${centaur1.tagCount}** and **${centaur2.tagCount}** times.`,
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
