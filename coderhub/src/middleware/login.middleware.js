const {
  USER_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISITS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZED
} = require("../config/error-constants");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const jwt = require("jsonwebtoken");
const { publicKey } = require("../config/publicKeys");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 1.判断用户名和密码不能为空
  if (!name || !password) {
    return ctx.app.emit("error", USER_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2.查询用户是否存在
  const users = await userService.getUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISITS, ctx);
  }

  // 3.查询用户的密码与传入的密码是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx);
  }

  // 4.将user对象保存在ctx中
  ctx.user = user;

  // 颁发令牌，返回给用户
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 获取token
  const authorization = ctx.headers.token;
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 验证token是否有效
  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ["HS256"]
    });

    // 将token的信息保留下来
    ctx.user = result;

    // 执行下一个中间件
    await next();
  } catch (error) {
    console.log(error);
    return ctx.app.emit("error", UNAUTHORIZED, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth
};
