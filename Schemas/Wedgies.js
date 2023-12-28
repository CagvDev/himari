const mongoose = require("mongoose");

const wedgieSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Wedgie = mongoose.model("Wedgie", wedgieSchema);

module.exports = Wedgie;
