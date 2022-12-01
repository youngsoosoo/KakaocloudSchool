exports.isLoggedIn = (req, res, next) => {
  //로그인 되어 있으면 다음 라우터 처리를 수행하고 그렇지 않으면 에러 발생
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  //로그인 되어 있지 않았다면 다음으로 넘어가고 그렇지 않으면 리다이렉트
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  try {
    //토큰 확인
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    //인증에 성공하면 다음 작업 수행
    return next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
