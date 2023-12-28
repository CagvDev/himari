const mongoose = require("mongoose");

const aftermathSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Aftermath = mongoose.model("Aftermath", aftermathSchema);

module.exports = Aftermath;
