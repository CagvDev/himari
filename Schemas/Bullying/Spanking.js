const mongoose = require("mongoose");

const spankingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Spanking = mongoose.model("Spanking", spankingSchema);

module.exports = Spanking;
