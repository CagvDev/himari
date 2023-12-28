const mongoose = require("mongoose");

const noogieSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Noogie = mongoose.model("Noogie", noogieSchema);

module.exports = Noogie;
