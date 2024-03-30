// 导入app
const app = require("./app/index.js");

require("./utils/handle-error.js");

// 抽取端口号
const { SERVER_PORT } = require("./config/server.config.js");

// 启动服务
app.listen(SERVER_PORT, () => {
  console.log("coderhub服务启动成功");
});
