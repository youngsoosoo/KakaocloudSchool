const express = require("express");

const { v4: uuidv4 } = require("uuid");

const { User, Domain } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //로그인 한 유저가 있으면 유저의 모든 데이트럴 찾아서 대입
    const user = await User.findOne({
      where: { id: (req.user && req.user.id) || null },
      include: { model: Domain },
    });
    res.render("login", {
      user,
      domains: user && user.Domains,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//도메인 등록 처리
router.post("/domain", isLoggedIn, async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4(),
    });
    //삽입하고 메인 페이지로 이동
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
