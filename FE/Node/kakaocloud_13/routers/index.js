const express = require('express');

const router = express.Router();
const path = require('path');//절대 경로 생성을 위해 사용

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;