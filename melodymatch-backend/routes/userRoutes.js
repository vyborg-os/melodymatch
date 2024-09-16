const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, '123456789');
    req.user = decoded; // Assign user info to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

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

// Fetch user by mail
router.get('/users/:email', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find users with at least one matching preference, excluding the current user
      const matches = await User.find({
        email: { $ne: user.email }, // Exclude the requesting user
        preferences: { $in: user.preferences }, // Find users with shared preferences
      });
  
      res.json(matches);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Add a new user
router.post('/users', async (req, res) => {
  const { name, email, password, preferences } = req.body;
   // Check if user already exists
   const userchk = await User.findOne({ email: email });
   console.log("User check result:", userchk);
   if (userchk) {
     return res.status(400).json({ error: 'User already exists' });
   }
     // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name, email, password: hashedPassword, preferences
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
  
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
    // Create JWT payload and sign token
    const payload = { id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(payload, '123456789', { expiresIn: '1h' });
  
    res.json({ token, user: { name: user.name, email: user.email } });
  });
  

  
module.exports = router;
