const KoaRouter = require("@koa/router");
const UserController = require("../controller/user.controller.js");
const {
  verifyUser,
  handlePassword
} = require("../middleware/user.middleware.js");

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

// 2.定义路由映射
// 2.1用户注册接口
userRouter.post(
  "/register",
  verifyUser,
  handlePassword,
  UserController.createUser
);

// 3.导出路由对象
module.exports = userRouter;
