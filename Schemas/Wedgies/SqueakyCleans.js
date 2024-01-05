const mongoose = require("mongoose");

const squeakyCleanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const SqueakyClean = mongoose.model("SqueakyClean", squeakyCleanSchema);

module.exports = SqueakyClean;
