const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();

// ✅ Schema for registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// ✅ Schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("Email already registered");

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashed });

  try {
    await newUser.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(500).send("Server error during registration");
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid email or password");

  try {
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "default_secret", // fallback if not in .env
      { expiresIn: "1d" }
    );
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).send("Error generating token");
  }
});

module.exports = router;
