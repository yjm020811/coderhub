const userService = require("../service/user.service");
const jwt = require("jsonwebtoken");

class UserController {
  async createUser(ctx, next) {
    // 1.获取用户传递参数
    const user = ctx.request.body;

    // 2.将user保存到数据库
    const result = await userService.create(user);

    // 3.返回响应
    ctx.body = {
      message: "用户注册成功",
      data: result
    };
  }
}

module.exports = new UserController();
