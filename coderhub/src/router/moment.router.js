const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middare")
const MomentController = require("../controller/moment.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

//增
momentRouter.post("/", verifyAuth, MomentController.create);
// 查
momentRouter.get("/", MomentController.list)
momentRouter.get("/:momentId", MomentController.detail)
// 删
momentRouter.delete("/", verifyAuth, verifyPermission, MomentController.remove)
// 改
momentRouter.patch("/", verifyAuth, verifyPermission, MomentController.update)


module.exports = momentRouter;
