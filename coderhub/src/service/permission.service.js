const connection = require("../db/index");

class PermissionService {
    async checkMoment(momentId, userId) {

        // 拼接sql语句
        const statement = 'SELECT * FROM moment WHERE id = ? AND user_id = ?';
        // 执行sql语句
        const [result] = await connection.execute(statement, [momentId, userId])
        // 
        return !!result.length
    }

}

module.exports = new PermissionService();
