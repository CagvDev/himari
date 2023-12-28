const mongoose = require("mongoose");

const hangingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Hanging = mongoose.model("Hanging", hangingSchema);

module.exports = Hanging;
