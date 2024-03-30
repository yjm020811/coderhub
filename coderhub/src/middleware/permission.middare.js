const {
    OPERATION_NOT_ALLOWED
} = require("../config/error-constants");
const permissionService = require("../service/permission.service");

//自己只能修改自己相关的moment，并不是给一个moment的id就能修改
const verifyPermission = async (ctx, next) => {
    // 获取登录用户的id
    const { id } = ctx.user;
    // 获取资源的id
    const momentId = ctx.request.body.id;
    console.log(momentId, id);

    // 查询是否有修改momentId的权限
    const isPermission = await permissionService.checkMoment(momentId, id)
    console.log(isPermission);
    if (!isPermission) {
        return ctx.app.emit('error', OPERATION_NOT_ALLOWED, ctx)
    }

    // 执行下一个中间件
    await next()
}

module.exports = {
    verifyPermission
}