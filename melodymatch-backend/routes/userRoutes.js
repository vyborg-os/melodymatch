const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/welcome', (req, res) => {
    res.json({ message: "Welcome to MelodyMatch!" });
  });
  
// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    preferences: req.body.preferences,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
