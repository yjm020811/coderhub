const mysql = require("mysql2");

// 创建连接池对象
const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  database: "coderhub",
  user: "root",
  password: "yangjunming123",
  connectionLimit: 10
});

// 通过连接池对象获取连接对象
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("连接失败", err);
    return;
  }

  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败", err);
      return;
    } else {
      console.log("数据库连接成功");
    }
  });
});

// 获取连接对象
const connection = connectionPool.promise();

module.exports = connection;
