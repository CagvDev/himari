const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Locker = mongoose.model("Locker", lockerSchema);

module.exports = Locker;
