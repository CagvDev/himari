const mongoose = require("mongoose");

const pickingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Picking = mongoose.model("Picking", pickingSchema);

module.exports = Picking;
