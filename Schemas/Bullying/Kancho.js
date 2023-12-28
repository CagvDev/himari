const mongoose = require("mongoose");

const kanchoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Kancho = mongoose.model("Kancho", kanchoSchema);

module.exports = Kancho;
