const mongoose = require("mongoose");

const centaurSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Centaur = mongoose.model("Centaur", centaurSchema);

module.exports = Centaur;
