const momentService = require("../service/moment.service");

class MomentController {
    // 发布动态
    async create(ctx, next) {
        // 获取动态数据
        const { content } = ctx.request.body;
        // 动态由谁发布（根据token获取用户信息）
        const { id } = ctx.user;
        // 将数据保存到数据库
        await momentService.create(content, id)

        ctx.body = {
            code: 200,
            message: '发布动态成功',
        }
    }

    // 获取动态列表
    async list(ctx, next) {
        // 获取offset/size
        const { offset, size } = ctx.query

        const result = await momentService.queryList(offset, size)
        ctx.body = {
            code: 200,
            message: '获取动态列表成功',
            data: result
        }
    }

    // 获取动态详情
    async detail(ctx, next) {
        const { momentId } = ctx.params
        console.log(momentId);
        const result = await momentService.getMomentById(momentId)
        console.log(result);
        ctx.body = {
            code: 200,
            message: '获取动态详情成功',
            data: result[0]
        }
    }

    // 删除动态
    async remove(ctx, next) {
        // 获取删除的momentId
        const momentId = ctx.request.body.id
        // 执行数据库的操作
        await momentService.deleteMomentById(momentId)
        ctx.body = {
            code: 200,
            message: '动态删除成功',
        }
    }

    // 修改动态
    async update(ctx, next) {
        // 修改的内容
        const { content, id } = ctx.request.body
        await momentService.updateMoment(content, id)
        ctx.body = {
            code: 200,
            message: '动态修改成功',
        }
    }
}

module.exports = new MomentController();
