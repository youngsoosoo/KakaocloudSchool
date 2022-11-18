const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Board');
});

router.get('/register', (req, res) => {
    res.send('글쓰기');
});

module.exports = router;