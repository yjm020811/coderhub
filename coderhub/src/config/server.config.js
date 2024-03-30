// dotenv的作用：读取.env文件中的配置，然后将配置写入到process.env中
const dotenv = require("dotenv");

dotenv.config();

module.exports = { SERVER_PORT } = process.env;
