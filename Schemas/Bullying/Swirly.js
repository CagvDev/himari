const mongoose = require("mongoose");

const swirlySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Swirly = mongoose.model("Swirly", swirlySchema);

module.exports = Swirly;
