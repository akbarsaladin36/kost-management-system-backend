const db = require('../config/database')

class TransactionRepository {
    async GetAllRepository() {
        try {
            const queryString = "SELECT * FROM transactions"
            const [rows] = await db.query(queryString)
            return rows
        } catch(error) {
            throw new Error(error)
        }
    }
    async GetAllByOwnerRepository(ownerUuid) {
        try {
            const queryString = "SELECT * FROM transactions WHERE owner_uuid = ?"
            const [rows] = await db.query(queryString, ownerUuid)
            return rows
        } catch(error) {
            throw new Error(error)
        }
    }
    async GetAllByUserRepository(userUuid) {
        try {
            const queryString = "SELECT * FROM transactions WHERE user_uuid = ?"
            const [rows] = await db.query(queryString, userUuid)
            return rows
        } catch(error) {
            throw new Error(error)
        }
    }
    async GetOneRepository(condition) {
        try {
            const queryString = "SELECT * FROM transactions WHERE ?"
            // const queryString = "SELECT * FROM transactions WHERE code = ?"
            const params = [condition]
            const [rows] = await db.query(queryString, params)
            return rows[0]
        } catch(error) {
            throw new Error(error)
        }
    }
    async CreateRepository(setData) {
        try {
            const queryString = "INSERT INTO transactions SET ?"
            const params = [setData]
            const result = await db.query(queryString, params)
            return { id: result.insertId, ...setData }
        } catch(error) {
            throw new Error(error)
        }
    }
    async UpdateRepository(transactionCode, setData) {
        try {
            const queryString = "UPDATE transactions SET ? WHERE code = ?"
            const params = [setData, transactionCode]
            const result = await db.query(queryString, params)
            return this.GetOneRepository(transactionCode)
        } catch(error) {
            throw new Error(error)
        }
    }
    async DeleteRepository(transactionCode) {
        try {
            const queryString = "DELETE FROM transactions WHERE code = ?"
            const params = [transactionCode]
            const result = await db.query(queryString, params)
            return result.affectedRows > 0
        } catch(error) {
            throw new Error(error)
        }
    }
}

module.exports = new TransactionRepository()