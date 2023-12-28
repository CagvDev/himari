const mongoose = require("mongoose");

const pantsingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Pantsing = mongoose.model("Pantsing", pantsingSchema);

module.exports = Pantsing;
