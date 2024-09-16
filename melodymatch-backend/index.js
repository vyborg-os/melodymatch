require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend's port
    credentials: true,
  }));
app.use(express.json());

// Use routes
app.use('/api', userRoutes);

// Routes
app.get('/', (req, res) => {
   res.send('Welcome to MelodyMatch API');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));
 
