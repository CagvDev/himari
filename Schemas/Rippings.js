const mongoose = require("mongoose");

const rippingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Ripping = mongoose.model("Ripping", rippingSchema);

module.exports = Ripping;
