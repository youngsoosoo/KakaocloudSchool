const express = require("express");
const { verifyToken } = require("./middlewares");

const router = express.Router();

//토큰을 확인하기 위한 처리
router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
