require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

// Middleware
app.use(express.json());
const publicPath = path.join(__dirname, 'public');
console.log('Attempting to serve static files from:', publicPath); // Debug log
if (fs.existsSync(publicPath)) {
  console.log('Public folder exists. Listing contents:', fs.readdirSync(publicPath));
} else {
  console.log('Public folder does NOT exist at:', publicPath);
}
app.use(express.static(publicPath));

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
  console.log('Serving signup.html from:', path.join(publicPath, 'signup.html'));
  res.sendFile(path.join(publicPath, 'signup.html'));
});

// Debug route to list files
app.get('/debug-files', (req, res) => {
  fs.readdir(publicPath, (err, files) => {
    if (err) return res.status(500).send('Error reading public folder: ' + err.message);
    res.json({ files, path: publicPath });
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));