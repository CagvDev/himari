const mongoose = require("mongoose");

const wetWillieSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const WetWillie = mongoose.model("WetWillie", wetWillieSchema);

module.exports = WetWillie;
