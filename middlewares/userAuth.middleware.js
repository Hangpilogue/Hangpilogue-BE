"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.send("It needs login");
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  if (tokenType !== "Bearer") return res.send("It needs login");
  try {
    const userInfo = jwt.verify(tokenValue, SECRET_KEY);
    res.locals.userId = userInfo.userId;
    res.locals.nickname = userInfo.nickname;
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(419).json({ message: "토큰이 만료되었습니다." });

    if (err.name === "JsonWebTokenError")
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
  next();
};
// User Authorization
