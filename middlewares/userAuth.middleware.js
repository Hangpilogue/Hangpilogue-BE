"use strict";
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log("Hi Am I middleware?");
  if (!req.headers.authorization) return res.send("It needs login");
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  if (tokenType !== "Bearer") return res.send("It needs login");
  try {
    jwt.verify(tokenValue, "SECRET_KEY");
  } catch (err) {
    if (e.name === "TokenExpiredError")
      return res.status(419).json({ message: "토큰이 만료되었습니다." });

    if (e.name === "JsonWebTokenError")
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
  next();
};
// User Authorization
