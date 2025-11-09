const helper = require('../helper')
const roomService = require('../services/roomService')
const transactionService = require('../services/transactionService')

class RoomController {
    async GetAllRoomsController(req, res) {
        try {
            const rooms = await roomService.GetRoomsService()
            if(rooms.length > 0) {
                return helper.GetResponse(res, 200, 'All rooms data are succesfully appeared!', rooms)
            } else {
                return helper.GetResponse(res, 200, 'All rooms data are empty!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async GetAllRoomsByOwnerController(req, res) {
        try {
            const rooms = await roomService.GetRoomsByOwnerService(req.currentUser.uuid)
            if(rooms.length > 0) {
                return helper.GetResponse(res, 200, 'All rooms data by owner are succesfully appeared!', rooms)
            } else {
                return helper.GetResponse(res, 200, 'All rooms data by owner are empty!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async GetOneRoomController(req, res) {
        try {
            const { roomCode } = req.params
            const room = await roomService.GetRoomService({ code: roomCode })
            if(room) {
                return helper.GetResponse(res, 200, 'A room data are succesfully appeared!', room)
            } else {
                return helper.GetResponse(res, 400, 'A room data are not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async CreateRoomController(req, res) {
        try {
            const { ownerUuid, 
                    roomName, 
                    roomType, 
                    roomDesc,
                    roomPrice, 
                    roomQuantity, 
                    roomStatus } = req.body
            const roomCode = helper.GenerateCode('room-code')
            const roomSlug = helper.GenerateSlug(roomName)
            const checkRoom = await roomService.GetRoomService({ code: roomCode })
            if(checkRoom) {
                return helper.GetResponse(res, 400, 'A room data are registered!', null)
            } else {
                const setData = {
                    code: roomCode,
                    owner_uuid: ownerUuid,
                    name: roomName,
                    slug: roomSlug,
                    type: roomType ? roomType : null,
                    description: roomDesc,
                    price: roomPrice ? roomPrice : 0,
                    quantity: roomQuantity ? roomQuantity : 0,
                    status: roomStatus ? roomStatus : 0,
                    created_at: new Date(Date.now()),
                    created_by: req.currentUser.uuid,
                    created_by_name: req.currentUser.username
                }
                const result = await roomService.CreateRoomService(setData)
                return helper.GetResponse(res, 200, 'A new room is succesfully created!', result)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async UpdateRoomController(req, res) {
        try {
            const { roomCode } = req.params
            const { roomName, 
                    roomType, 
                    roomDesc,
                    roomPrice, 
                    roomQuantity, 
                    roomStatus } = req.body
            const checkRoom = await roomService.GetRoomService({ code: roomCode })
            if(checkRoom) {
                const setData = {
                    name: roomName ? roomName : checkRoom.name,
                    type: roomType ? roomType : checkRoom.type,
                    description: roomDesc ? roomDesc : checkRoom.description,
                    price: roomPrice ? roomPrice : checkRoom.price,
                    quantity: roomQuantity ? roomQuantity : checkRoom.quantity,
                    status: roomStatus ? roomStatus : checkRoom.status,
                    updated_at: new Date(Date.now()),
                    updated_by: req.currentUser.uuid,
                    updated_by_name: req.currentUser.username
                }
                const result = await roomService.UpdateRoomService(roomCode, setData)
                return helper.GetResponse(res, 200, 'A existing room data are succesfully updated!', result)
            } else {
                return helper.GetResponse(res, 400, 'A room data are not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async DeleteRoomController(req, res) {
        try {
            const { roomCode } = req.params
            const checkRoom = await roomService.GetRoomService({ code: roomCode })
            if(checkRoom) {
                await roomService.DeleteRoomService(roomCode)
                return helper.GetResponse(res, 200, 'A existing room data are succesfully deleted!', null) 
            } else {
                return helper.GetResponse(res, 400, 'A room data are not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new RoomController()