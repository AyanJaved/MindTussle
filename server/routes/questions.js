const express = require("express");
const Question = require("../models/Question");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.get("/:subject",auth, async (req, res) => {
  const { subject } = req.params;
  try {
    const questions = await Question.find({
      subject: { $regex: new RegExp(`^${subject.trim()}$`, "i") },
    });
    res.json(questions);
  } catch (err) {
    res.status(500).send("Failed to fetch questions");
  }
});

module.exports = router;
