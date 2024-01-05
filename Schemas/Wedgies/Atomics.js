const mongoose = require("mongoose");

const atomicSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Atomic = mongoose.model("Atomic", atomicSchema);

module.exports = Atomic;
