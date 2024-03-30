const crypto = require("crypto");

function md5password(password) {
  const md5 = crypto.createHash("md5");
  // update()方法可以调用多次，最后调用digest()方法，返回加密后的数据
  const result = md5.update(password).digest("hex");
  return result;
}

module.exports = md5password;
