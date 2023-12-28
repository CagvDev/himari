const mongoose = require("mongoose");

const frontalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Frontal = mongoose.model("Frontal", frontalSchema);

module.exports = Frontal;
