const db = require('../config/database')

class RoomRepository {
    async GetAllRepository() {
        try {
            const queryString = "SELECT * FROM rooms"
            const [rows] = await db.query(queryString)
            return rows
        } catch(error) {
            throw new Error(error)
        }
    }
    async GetAllByOwnerRepository(ownerUuid) {
        try {
            const queryString = "SELECT * FROM rooms WHERE owner_uuid = ?"
            const params = [ownerUuid]
            const [rows] = await db.query(queryString, params)
            return rows
        } catch(error) {
            throw new Error(error)
        }
    }
    async GetOneRepository(condition) {
        try {
            const queryString = "SELECT * FROM rooms WHERE ?"
            const params = [condition]
            const [rows] = await db.query(queryString, params)
            return rows[0]
        } catch(error) {
            throw new Error(error)
        }
    }
    async CreateRepository(setData) {
        try {
            const queryString = "INSERT INTO rooms SET ?"
            const params = [setData]
            const result = await db.query(queryString, params)
            return { id: result.insertId, ...setData }
        } catch(error) {
            throw new Error(error)
        }
    }
    async UpdateRepository(roomCode, setData) {
        try {
            const queryString = "UPDATE rooms SET ? WHERE code = ?"
            const params = [setData, roomCode]
            const result = await db.query(queryString, params)
            return this.GetOneRepository(roomCode)
        } catch(error) {
            throw new Error(error)
        }
    }
    async DeleteRepository(roomCode) {
        try {
            const queryString = "DELETE FROM rooms WHERE code = ?"
            const params = [roomCode]
            const result = await db.query(queryString, params)
            return result.affectedRows > 0
        } catch(error) {
            throw new Error(error)
        }
    }
}

module.exports = new RoomRepository()