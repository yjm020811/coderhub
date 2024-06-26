const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISITS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZED,
  OPERATION_NOT_ALLOWED
} = require("../config/error-constants");

app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或密码不能为空";
      break;

    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经存在";
      break;

    case NAME_IS_NOT_EXISITS:
      code = -1003;
      message = "用户不存在";
      break;

    case PASSWORD_IS_INCORRECT:
      code = -1004;
      message = "密码错误";
      break;

    case UNAUTHORIZED:
      code = -1005;
      message = "无效token，请重新登录";
      break;


    case OPERATION_NOT_ALLOWED:
      code = -1006;
      message = "没有操作该资源的权限";
      break
  }

  ctx.body = {
    code,
    message
  };
});
