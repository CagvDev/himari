const mongoose = require("mongoose");

const sockGagSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const SockGag = mongoose.model("SockGag", sockGagSchema);

module.exports = SockGag;
