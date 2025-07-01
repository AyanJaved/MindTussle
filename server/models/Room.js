// models/Room.js

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  roomId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creator: { type: String, required: true },
  quizTime: { type: Number, required: true }, // in minutes
  quizStartTime: { type: Number, required: true }, // store Date.now() in milliseconds on creation
});

module.exports = mongoose.model("Room", roomSchema);
