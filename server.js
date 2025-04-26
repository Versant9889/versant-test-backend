require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

// Serve Static Files (Moved to Top)
const publicPath = path.join(__dirname, 'public');
console.log('Attempting to serve static files from:', publicPath);
if (fs.existsSync(publicPath)) {
  console.log('Public folder exists. Listing contents:', fs.readdirSync(publicPath));
} else {
  console.log('Public folder does NOT exist at:', publicPath);
}
app.use(express.static(publicPath, { index: 'signup.html' }));

// Debug Middleware for All Requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware for JSON
app.use(express.json());

// Test Route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route working');
});

// Debug Route
app.get('/debug-files', (req, res) => {
  console.log('Debug-files route hit');
  fs.readdir(publicPath, (err, files) => {
    if (err) return res.status(500).send('Error reading public folder: ' + err.message);
    res.json({ files, path: publicPath });
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));

// Default Route
app.get('/', (req, res) => {
  console.log('Serving signup.html from:', path.join(publicPath, 'signup.html'));
  if (fs.existsSync(path.join(publicPath, 'signup.html'))) {
    res.sendFile(path.join(publicPath, 'signup.html'));
  } else {
    res.status(404).send('signup.html not found in public folder');
  }
});

// Catch-all
app.use((req, res) => {
  console.log('Catch-all route hit for:', req.url);
  res.status(404).send('Not Found');
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));