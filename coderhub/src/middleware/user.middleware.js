const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS
} = require("../config/error-constants");
const userService = require("../service/user.service");

// 导入md5password函数
const md5password = require("../utils/md5-password");

const verifyUser = async (ctx, next) => {
  // 1.获取用户传递参数
  const user = ctx.request.body;

  // 1.1判断name和password是否为空
  if (!user.name || !user.password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 1.2判断用户名是否已经被注册
  const users = await userService.getUserByName(user.name);
  // 如果users数组的长度大于0，说明用户名已经被注册
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }
  // 2.调用next，继续向下执行
  await next();
};

const handlePassword = async (ctx, next) => {
  // 1.获取用户传递参数
  const { password } = ctx.request.body;

  // 2.对密码进行加密
  ctx.request.body.password = md5password(password);

  // 3.调用next，继续向下执行
  await next();
};

module.exports = {
  verifyUser,
  handlePassword
};
