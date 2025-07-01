const express = require("express");
const Room = require("../models/Room");
const router = express.Router();
const Joi = require("joi");
const auth = require("../middleware/authMiddleware");

// Validation schemas
const createRoomSchema = Joi.object({
  subject: Joi.string().required(),
  password: Joi.string().min(3).required(),
  creator: Joi.string().required(),
  quizTime: Joi.number().valid(3, 5, 10).required(),
});

const joinRoomSchema = Joi.object({
  roomId: Joi.string().required(),
  password: Joi.string().required(),
});

// Create Room Route
router.post("/create", auth, async (req, res) => {
  try {
    const { error } = createRoomSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { subject, password, creator, quizTime } = req.body;
    const roomId = Math.random().toString(36).substring(2, 8);
    const quizStartTime = Date.now();

    const newRoom = new Room({
      subject,
      password,
      roomId,
      creator,
      quizTime,
      quizStartTime,
    });

    await newRoom.save();

    res.json({ roomId, password, quizTime, quizStartTime });
  } catch (err) {
    console.error("Error creating room:", err);
    res.status(500).json({ error: "Server error while creating room." });
  }
});

// Join Room Route
router.post("/join", auth, async (req, res) => {
  try {
    const { error } = joinRoomSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { roomId, password } = req.body;
    const room = await Room.findOne({ roomId });

    if (!room || room.password !== password) {
      return res.status(400).json({ error: "Invalid room ID or password." });
    }

    res.json({
      message: "Joined",
      quizTime: room.quizTime,
      subject: room.subject,
      quizStartTime: room.quizStartTime,
    });
  } catch (err) {
    console.error("Error joining room:", err);
    res.status(500).json({ error: "Server error while joining room." });
  }
});

module.exports = router;
