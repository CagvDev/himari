const mongoose = require("mongoose");

const kissSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Kiss = mongoose.model("Kiss", kissSchema);

module.exports = Kiss;
