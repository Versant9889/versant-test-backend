require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

// Middleware for JSON
app.use(express.json());

// Debug Middleware for All Requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Define Public Path
const publicPath = path.join(__dirname, 'public');
console.log('Public folder path:', publicPath);
if (fs.existsSync(publicPath)) {
  console.log('Public folder exists. Listing contents:', fs.readdirSync(publicPath));
} else {
  console.log('Public folder does NOT exist at:', publicPath);
}

// Serve Static Files Directly
app.get('/', (req, res) => {
  const filePath = path.join(publicPath, 'signup.html');
  console.log('Serving signup.html from:', filePath);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('signup.html not found in public folder');
  }
});

app.get('/login.html', (req, res) => {
  const filePath = path.join(publicPath, 'login.html');
  console.log('Serving login.html from:', filePath);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('login.html not found');
  }
});

app.get('/test.html', (req, res) => {
  const filePath = path.join(publicPath, 'test.html');
  console.log('Serving test.html from:', filePath);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('test.html not found');
  }
});

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
console.log('Registering /api/questions routes...');
app.use('/api/questions', require('./routes/questions'));

// Catch-all
app.use((req, res) => {
  console.log('Catch-all route hit for:', req.url);
  console.log('Request headers:', req.headers);
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