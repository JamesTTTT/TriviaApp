const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/details", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/edit", async (req, res) => {
  // Edit user logic here
});

router.delete("/delete", async (req, res) => {
  // Delete user logic here
});

module.exports = router;
