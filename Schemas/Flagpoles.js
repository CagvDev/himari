const mongoose = require("mongoose");

const flagpoleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Flagpole = mongoose.model("Flagpole", flagpoleSchema);

module.exports = Flagpole;
