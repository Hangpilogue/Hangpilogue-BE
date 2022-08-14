const express = require("express");
const app = express();
const PORT = 5000;
// 미들웨어 불러주는 애들과 에러처리 미들웨어
const router = require("./routes");
const { sequelize } = require("./models");

sequelize
// .sync({force:true})

app.use(express.json());
app.use("/", express.urlencoded({ extended: false }), router);

app.listen(PORT, () => {
  console.log("Server Running");
});
