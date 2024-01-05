const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Hanging = require("../../Schemas/Wedgies/Hangings");
const fs = require("fs");

const images = require("../../Json/multiple/hanging.json");

const wedgie2Images = images.wedgie2;
const wedgie3Images = images.wedgie3;
const wedgie4Images = images.wedgie4;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("multiplehang")
    .setDescription("Tag nerds to hang them by their underwear (Max. 4).")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to tag").setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user2").setDescription("User to tag").setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user3").setDescription("User to tag")
    )
    .addUserOption((option) =>
      option.setName("user4").setDescription("User to tag")
    ),

  async execute(interaction) {
    try {
      const taggedUser = interaction.options.getMember("user");
      const taggedUser2 = interaction.options.getMember("user2");
      const taggedUser3 = interaction.options.getMember("user3");
      const taggedUser4 = interaction.options.getMember("user4");
      const invokerUser = interaction.member;

      const taggedUsersCount = [
        taggedUser,
        taggedUser2,
        taggedUser3,
        taggedUser4,
      ].filter(Boolean).length;

      let hanging1 = null,
        hanging2 = null,
        hanging3 = null,
        hanging4 = null;

      if (taggedUser) {
        hanging1 = await Hanging.findOneAndUpdate(
          { userId: taggedUser.id },
          { $inc: { tagCount: 1 } },
          { upsert: true, new: true }
        );
      }
      if (taggedUser2) {
        hanging2 = await Hanging.findOneAndUpdate(
          { userId: taggedUser2.id },
          { $inc: { tagCount: 1 } },
          { upsert: true, new: true }
        );
      }
      if (taggedUser3) {
        hanging3 = await Hanging.findOneAndUpdate(
          { userId: taggedUser3.id },
          { $inc: { tagCount: 1 } },
          { upsert: true, new: true }
        );
      }
      if (taggedUser4) {
        hanging4 = await Hanging.findOneAndUpdate(
          { userId: taggedUser4.id },
          { $inc: { tagCount: 1 } },
          { upsert: true, new: true }
        );
      }

      let description;
      if (taggedUsersCount === 2) {
        description = `**${invokerUser.displayName}** puts **${taggedUser.displayName}** and **${taggedUser2.displayName}** in a hanging wedgie`;
      } else if (taggedUsersCount === 3) {
        description = `**${invokerUser.displayName}** puts **${taggedUser.displayName}**, **${taggedUser2.displayName}** and **${taggedUser3.displayName}** in a hanging wedgie`;
      } else if (taggedUsersCount === 4) {
        description = `**${invokerUser.displayName}** puts **${taggedUser.displayName}**, **${taggedUser2.displayName}**, **${taggedUser3.displayName}** and **${taggedUser4.displayName}** in a hanging wedgie`;
      } else {
        await interaction.reply(
          "You must tag at least two users to use this command."
        );
        return;
      }

      let value;
      if (taggedUsersCount === 2) {
        value = `${description} \n**${taggedUser.displayName}** and **${taggedUser2.displayName}** has been in a hanging wedgie **${hanging1.tagCount}** y **${hanging2.tagCount}** times`;
      } else if (taggedUsersCount === 3) {
        value = `${description} \n**${taggedUser.displayName}**, **${taggedUser2.displayName}** and **${taggedUser3.displayName}** has been in a hanging wedgie **${hanging1.tagCount}**, **${hanging2.tagCount}** y **${hanging3.tagCount}** times`;
      } else if (taggedUsersCount === 4) {
        value = `${description} \n**${taggedUser.displayName}**, **${taggedUser2.displayName}**, **${taggedUser3.displayName}** and **${taggedUser4.displayName}** has been in a hanging wedgie **${hanging1.tagCount}**, **${hanging2.tagCount}**, **${hanging3.tagCount}** y **${hanging4.tagCount}** times`;
      }

      let randomWedgie2Image;
      let randomWedgie3Image;
      let randomWedgie4Image;

      if (wedgie2Images.length > 0) {
        randomWedgie2Image =
          wedgie2Images[Math.floor(Math.random() * wedgie2Images.length)];
      }
      if (wedgie3Images.length > 0) {
        randomWedgie3Image =
          wedgie3Images[Math.floor(Math.random() * wedgie3Images.length)];
      }
      if (wedgie4Images.length > 0) {
        randomWedgie4Image =
          wedgie4Images[Math.floor(Math.random() * wedgie4Images.length)];
      }

      let randomImage;

      if (taggedUsersCount === 2 && randomWedgie2Image) {
        randomImage = randomWedgie2Image;
      } else if (taggedUsersCount === 3 && randomWedgie3Image) {
        randomImage = randomWedgie3Image;
      } else if (taggedUsersCount === 4 && randomWedgie4Image) {
        randomImage = randomWedgie4Image;
      }

      const embed = new EmbedBuilder()
        .setColor("Random")
        .addFields({
          name: " ",
          value: value,
        })
        .setImage(randomImage);

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error al guardar el usuario en la base de datos:", error);
      await interaction.reply("Ha ocurrido un error al procesar el comando.");
    }
  },
};
