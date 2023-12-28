const mongoose = require("mongoose");

const scarecrowSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Scarecrow = mongoose.model("Scarecrow", scarecrowSchema);

module.exports = Scarecrow;
