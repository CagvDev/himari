const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  exp: { type: Number, default: 0 },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
