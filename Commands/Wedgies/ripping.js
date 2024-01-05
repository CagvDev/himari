const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Ripping = require("../../Schemas/Wedgies/Rippings");
const images = require("../../Json/ripping.json");
const { getRandomImage } = require("../../Functions/imageLoader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ripping")
    .setDescription("Tag someone to rip their underwear.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    ),

  async execute(interaction) {
    const taggedUser = interaction.options.getMember("user");
    const invokerUser = interaction.member;

    try {
      let ripping = await Ripping.findOne({ userId: taggedUser.id });

      if (!ripping) {
        ripping = new Ripping({ userId: taggedUser.id });
      }

      ripping.tagCount++;
      await ripping.save();

      let description = `**${invokerUser.displayName}** has ripped the underwear of **${taggedUser.displayName}**`;
      if (invokerUser.id === taggedUser.id) {
        description = `**${invokerUser.displayName}** ripped their own underwear`;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: `${description} \n**${taggedUser.displayName}** has had their underwear ripped **${ripping.tagCount}** times`,
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
