const express = require('express');
const router = express.Router();

router.get('/questions', (req, res) => {
  res.send('Questions API is working');
});

module.exports = router;