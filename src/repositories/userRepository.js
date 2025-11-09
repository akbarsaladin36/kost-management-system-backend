const db = require('../config/database')

class UserRepository {
    async GetAllRepository() {
        try {
            const queryString = "SELECT * FROM users"
            const [rows] = await db.query(queryString)
            return rows
        } catch(error) {
            throw new Error(error)
        }
    }

    async GetOneRepository(username) {
        try {
            const queryString = "SELECT * FROM users WHERE username = ?"
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

    async UpdateRepository(username, setData) {
        try {
            const queryString = "UPDATE users SET ? WHERE username = ?"
            const params = [setData, username]
            const result = await db.query(queryString, params)
            return this.GetOneRepository(username)
        } catch(error) {
            throw new Error(error)
        }
    }

    async DeleteRepository(username) {
        try {
            const queryString = "DELETE FROM users WHERE username = ?"
            const params = [username]
            const result = await db.query(queryString, params)
            return result.affectedRows > 0
        } catch(error) {
            throw new Error(error)
        }
    }
}

module.exports = new UserRepository()