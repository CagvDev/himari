const mongoose = require("mongoose");

const stripSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Strip = mongoose.model("Strip", stripSchema);

module.exports = Strip;
