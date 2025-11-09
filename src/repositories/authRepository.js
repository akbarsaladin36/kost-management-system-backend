const db = require('../config/database')

class AuthRepository {
    async GetOneRepository(username) {
        try {
            const queryString = "SELECT uuid,username,email,password,role FROM users WHERE username = ?"
            const params = [username]
            const [rows] = await db.query(queryString, params)
            return rows[0]
        } catch(error) {
            throw new Error(error)
        }
    }

    async CreateRepository(setData) {
        try {
            const queryString = "INSERT INTO users SET ?"
            const params = [setData]
            const result = await db.query(queryString, params)
            return { id: result.insertId, ...setData }
        } catch(error) {
            throw new Error(error)
        }
    }
}

module.exports = new AuthRepository()