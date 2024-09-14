const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: [String], // Array of song preferences or genres
});

module.exports = mongoose.model('User', UserSchema);
