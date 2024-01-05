const mongoose = require("mongoose");

const ballSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Ball = mongoose.model("Ball", ballSchema);

module.exports = Ball;
