require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));

// MongoDB Connection
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

console.log('DATABASE_URL:', dbUrl);
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Default Route
app.get('/', (req, res) => {
  res.redirect('/signup.html'); // Redirect to signup.html
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));