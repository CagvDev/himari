const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Profile = require("../../Schemas/Profile");

const Aftermath = require("../../Schemas/Aftermaths");
const Atomic = require("../../Schemas/Atomics");
const Ball = require("../../Schemas/Balls");
const Centaur = require("../../Schemas/Centaurs");
const Crab = require("../../Schemas/Crabs");
const Dragging = require("../../Schemas/Draggings");
const Flagpole = require("../../Schemas/Flagpoles");
const Frontal = require("../../Schemas/Frontals");
const Hanging = require("../../Schemas/Hangings");
const Locker = require("../../Schemas/Lockers");
const Messy = require("../../Schemas/Messies");
const Mummy = require("../../Schemas/Mummies");
const Picking = require("../../Schemas/Pickings");
const Ripping = require("../../Schemas/Rippings");
const Scarecrow = require("../../Schemas/Scarecrows");
const SqueakyClean = require("../../Schemas/SqueakyCleans");
const Wedgie = require("../../Schemas/Wedgies");

const Kancho = require("../../Schemas/Bullying/Kancho");
const Noogie = require("../../Schemas/Bullying/Noogie");
const Pantsing = require("../../Schemas/Bullying/Pantsing");
const SockGag = require("../../Schemas/Bullying/SockGag");
const Spanking = require("../../Schemas/Bullying/Spanking");
const Strip = require("../../Schemas/Bullying/Strip");
const Swirly = require("../../Schemas/Bullying/Swirly");
const TittyTwister = require("../../Schemas/Bullying/TittyTwister");
const Trash = require("../../Schemas/Bullying/Trash");
const WetWillie = require("../../Schemas/Bullying/WetWillie");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Displays the user's profile."),

  async execute(interaction) {
    try {
      const user = interaction.user;
      let profile = await Profile.findOne({ userId: user.id });

      if (!profile) {
        profile = new Profile({ userId: user.id, exp: 0 });
        await profile.save();
      }

      const aftermath = await Aftermath.findOne({ userId: user.id });
      const atomic = await Atomic.findOne({ userId: user.id });
      const ball = await Ball.findOne({ userId: user.id });
      const centaur = await Centaur.findOne({ userId: user.id });
      const crab = await Crab.findOne({ userId: user.id });
      const dragging = await Dragging.findOne({ userId: user.id });
      const flagpole = await Flagpole.findOne({ userId: user.id });
      const frontal = await Frontal.findOne({ userId: user.id });
      const hanging = await Hanging.findOne({ userId: user.id });
      const locker = await Locker.findOne({ userId: user.id });
      const messy = await Messy.findOne({ userId: user.id });
      const mummy = await Mummy.findOne({ userId: user.id });
      const picking = await Picking.findOne({ userId: user.id });
      const ripping = await Ripping.findOne({ userId: user.id });
      const scarecrow = await Scarecrow.findOne({ userId: user.id });
      const squeakyClean = await SqueakyClean.findOne({ userId: user.id });
      const wedgie = await Wedgie.findOne({ userId: user.id });

      const kancho = await Kancho.findOne({ userId: user.id });
      const noogie = await Noogie.findOne({ userId: user.id });
      const pantsing = await Pantsing.findOne({ userId: user.id });
      const sockGag = await SockGag.findOne({ userId: user.id });
      const spanking = await Spanking.findOne({ userId: user.id });
      const strip = await Strip.findOne({ userId: user.id });
      const swirly = await Swirly.findOne({ userId: user.id });
      const tittyTwister = await TittyTwister.findOne({ userId: user.id });
      const trash = await Trash.findOne({ userId: user.id });
      const wetWillie = await WetWillie.findOne({ userId: user.id });

      const userAvatar = user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 512,
      });

      const totalTags =
        (aftermath ? aftermath.tagCount : 0) +
        (atomic ? atomic.tagCount : 0) +
        (ball ? ball.tagCount : 0) +
        (centaur ? centaur.tagCount : 0) +
        (crab ? crab.tagCount : 0) +
        (dragging ? dragging.tagCount : 0) +
        (flagpole ? flagpole.tagCount : 0) +
        (frontal ? frontal.tagCount : 0) +
        (hanging ? hanging.tagCount : 0) +
        (locker ? locker.tagCount : 0) +
        (messy ? messy.tagCount : 0) +
        (mummy ? mummy.tagCount : 0) +
        (picking ? picking.tagCount : 0) +
        (ripping ? ripping.tagCount : 0) +
        (scarecrow ? scarecrow.tagCount : 0) +
        (squeakyClean ? squeakyClean.tagCount : 0) +
        (wedgie ? wedgie.tagCount : 0) +
        (kancho ? kancho.tagCount : 0) +
        (noogie ? noogie.tagCount : 0) +
        (pantsing ? pantsing.tagCount : 0) +
        (sockGag ? sockGag.tagCount : 0) +
        (spanking ? spanking.tagCount : 0) +
        (strip ? strip.tagCount : 0) +
        (swirly ? swirly.tagCount : 0) +
        (tittyTwister ? tittyTwister.tagCount : 0) +
        (trash ? trash.tagCount : 0) +
        (wetWillie ? wetWillie.tagCount : 0);

      const expGained = totalTags * 8;

      let newExp = expGained;

      profile.exp = newExp;
      await profile.save();

      const profiles = await Profile.find({}, { userId: 1, exp: 1 }).sort({
        exp: -1,
      });

      const userIndex = profiles.findIndex((p) => p.userId === user.id);
      const userRank = userIndex !== -1 ? userIndex + 1 : "N/A";

      const embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setColor("Random")
        .setTitle(`${user.username}'s profile`)
        .addFields(
          {
            name: "XP",
            value: profile.exp.toString(),
            inline: true,
          },
          { name: "Rank", value: userRank.toString(), inline: true },
          {
            name: "Wedgie tag count",
            value: `
            Aftermath: ${aftermath ? aftermath.tagCount : 0}
            Atomic: ${atomic ? atomic.tagCount : 0}
            Ball: ${ball ? ball.tagCount : 0}
            Centaur: ${centaur ? centaur.tagCount : 0}
            Crab: ${crab ? crab.tagCount : 0}
            Dragging: ${dragging ? dragging.tagCount : 0}
            Flagpole: ${flagpole ? flagpole.tagCount : 0}
            Frontal: ${frontal ? frontal.tagCount : 0}
            Hanging: ${hanging ? hanging.tagCount : 0}
            Locker: ${locker ? locker.tagCount : 0}
            Messy: ${messy ? messy.tagCount : 0}
            Mummy: ${mummy ? mummy.tagCount : 0}
            Picking: ${picking ? picking.tagCount : 0}
            Ripping: ${ripping ? ripping.tagCount : 0}
            Scarecrow: ${scarecrow ? scarecrow.tagCount : 0}
            SqueakyClean: ${squeakyClean ? squeakyClean.tagCount : 0}
            Wedgie: ${wedgie ? wedgie.tagCount : 0}
            `,
            inline: false,
          },
          {
            name: "Bullying tag count",
            value: `
            Kancho: ${kancho ? kancho.tagCount : 0}
            Noogie: ${noogie ? noogie.tagCount : 0}
            Pantsing: ${pantsing ? pantsing.tagCount : 0}
            Sock Gag: ${sockGag ? sockGag.tagCount : 0}
            Spanking: ${spanking ? spanking.tagCount : 0}
            Strip: ${strip ? strip.tagCount : 0}
            Swirly: ${swirly ? swirly.tagCount : 0}
            Titty Twister: ${tittyTwister ? tittyTwister.tagCount : 0}
            Trash: ${trash ? trash.tagCount : 0}
            Wet Willie: ${wetWillie ? wetWillie.tagCount : 0}
            `,
          }
        );

      await interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      await interaction.reply("Ha ocurrido un error al mostrar el perfil.");
    }
  },
};
