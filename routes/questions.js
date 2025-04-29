const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');

router.get('/questions', auth, async (req, res) => {
  try {
    console.log('Fetching questions for user:', req.user); // Debug user from token
    const questions = await Question.findOne();
    console.log('Questions fetched:', questions); // Debug result
    if (!questions) {
      return res.status(404).json({ message: 'Questions not found' });
    }
    res.json(questions);
  } catch (err) {
    console.log('Error fetching questions:', err.message); // Debug error
    res.status(500).json({ message: 'Error fetching questions: ' + err.message });
  }
});

module.exports = router;