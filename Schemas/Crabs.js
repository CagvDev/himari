const mongoose = require("mongoose");

const crabSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Crab = mongoose.model("Crab", crabSchema);

module.exports = Crab;
