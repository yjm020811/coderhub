const jwt = require("jsonwebtoken");
const { publicKey } = require("../config/publicKeys");

class LoginController {
  sign(ctx, next) {
    // 获取用户信息
    const { id, name } = ctx.user;
    const JWT_SECRET = publicKey;
    // 颁发令牌
    const token = jwt.sign({ id, name }, JWT_SECRET);

    // 返回信息
    ctx.body = {
      code: 200,
      token,
      data: {
        id,
        name
      }
    };
  }
}

module.exports = new LoginController();
