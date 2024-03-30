const Koa = require("koa");
// 引入路由对象
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router/index.js");

const app = new Koa();

app.use(bodyParser());

// 调用registerRouters自动添加userRouter.routes()和userRouter.allowedMethods()
registerRouters(app);
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(loginRouter.routes());
// app.use(loginRouter.allowedMethods());

module.exports = app;
