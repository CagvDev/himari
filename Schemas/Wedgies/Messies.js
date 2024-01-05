const mongoose = require("mongoose");

const messySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Messy = mongoose.model("Messy", messySchema);

module.exports = Messy;
