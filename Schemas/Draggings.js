const mongoose = require("mongoose");

const draggingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tagCount: { type: Number, default: 0 },
});

const Dragging = mongoose.model("Dragging", draggingSchema);

module.exports = Dragging;
