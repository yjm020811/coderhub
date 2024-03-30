const connection = require("../db/index");

class UserService {
  async create(user) {
    // 获取用户传递参数
    const { name, password } = user;
    // 拼接sql语句
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    // 执行sql语句
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  // 根据用户名查询用户
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

module.exports = new UserService();
