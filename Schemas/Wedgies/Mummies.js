const mongoose = require("mongoose");

const momiaSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Momia = mongoose.model("Momia", momiaSchema);

module.exports = Momia;
