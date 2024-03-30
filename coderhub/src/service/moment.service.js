const connection = require("../db/index");

class MomentService {
    async create(content, userId) {
        // 拼接sql语句
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
        // 执行sql语句
        const [result] = await connection.execute(statement, [content, userId]);
        return result;
    }

    // 如果没有传递offset和size，默认0和10，传递了就使用传递的值
    async queryList(offset = 0, size = 10) {
        // 拼接sql语句（连表查询）
        const statement = `
        SELECT 
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
          (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
        FROM moment m
        LEFT JOIN user u ON u.id = m.user_id
        LIMIT ? OFFSET ?;
      `
        // 执行sql语句
        const [result] = await connection.execute(statement, [String(size), String(offset)]);
        return result;
    }

    async getMomentById(momentId) {
        const statement = `SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE m.id = ?;`

        // 执行sql语句
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }

    async deleteMomentById(momentId) {
        const statement = 'DELETE FROM moment WHERE id = ?;'
        const [result] = await connection.execute(statement, [momentId]);
        return result;
    }

    async updateMoment(content, id) {
        const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
        const [result] = await connection.execute(statement, [content, id]);
        return result
    }
}

module.exports = new MomentService();
