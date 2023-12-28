const mongoose = require("mongoose");

const trashSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Trash = mongoose.model("Trash", trashSchema);

module.exports = Trash;
