const roomRepository = require('../repositories/roomRepository')

class RoomService {
    async GetRoomsService() {
        return await roomRepository.GetAllRepository()
    }
    async GetRoomsByOwnerService(ownerUuid) {
        return await roomRepository.GetAllByOwnerRepository(ownerUuid)
    }
    async GetRoomService(condition) {
        return await roomRepository.GetOneRepository(condition)
    }
    async CreateRoomService(setData) {
        return await roomRepository.CreateRepository(setData)
    }
    async UpdateRoomService(roomCode, setData) {
        return await roomRepository.UpdateRepository(roomCode, setData)
    }
    async DeleteRoomService(roomCode) {
        return await roomRepository.DeleteRepository(roomCode)
    }
}

module.exports = new RoomService()