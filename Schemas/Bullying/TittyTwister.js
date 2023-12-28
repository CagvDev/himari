const mongoose = require("mongoose");

const tittyTwisterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const TittyTwister = mongoose.model("TittyTwister", tittyTwisterSchema);

module.exports = TittyTwister;
