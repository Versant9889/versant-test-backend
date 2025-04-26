require('dotenv').config();
const mongoose = require('mongoose');

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('Error: DATABASE_URL environment variable is not set');
  process.exit(1);
}

console.log('DATABASE_URL:', dbUrl);
mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err))
  .finally(() => mongoose.connection.close());