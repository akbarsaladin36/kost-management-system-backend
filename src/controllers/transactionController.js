const helper = require('../helper')
const roomService = require('../services/roomService')
const transactionService = require('../services/transactionService')

class TransactionController {
    async GetAllTransactionsController(req, res) {
        try {
            const transactions = await transactionService.GetTransactionsService()
            if(transactions.length > 0) {
                return helper.GetResponse(res, 200, 'All transactions are succesfully appeared!', transactions)
            } else {
                return helper.GetResponse(res, 200, 'All transactions are empty!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async GetAllTransactionsByOwnerController(req, res) {
        try {
            const transactions = await transactionService.GetTransactionsByOwnerService(req.currentUser.uuid)
            if(transactions.length > 0) {
                return helper.GetResponse(res, 200, 'All transactions are succesfully appeared!', transactions)
            } else {
                return helper.GetResponse(res, 200, 'All transactions are empty!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async GetAllTransactionsByUserController(req, res) {
        try {
            const transactions = await transactionService.GetTransactionsByUserService(req.currentUser.uuid)
            if(transactions.length > 0) {
                return helper.GetResponse(res, 200, 'All transactions are succesfully appeared!', transactions)
            } else {
                return helper.GetResponse(res, 200, 'All transactions are empty!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async GetOneTransactionController(req, res) {
        try {
            const { transactionCode } = req.params
            const checkTransaction = await transactionService.GetTransactionService({ code: transactionCode})
            if(checkTransaction) {
                return helper.GetResponse(res, 200, 'A transaction data is succesfully appeared!', checkTransaction)
            } else {
                return helper.GetResponse(res, 400, 'A transaction data is not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async CreateTransactionController(req, res) {
        try {
            const { ownerUuid, roomCode, roomType, transactionPrice, transactionQuantity } = req.body
            const transactionCode = helper.GenerateCode('transaction-code')
            const checkTransaction = await transactionService.GetTransactionService({ code: transactionCode })
            if(checkTransaction) {
                return helper.GetResponse(res, 400, 'A transaction code is registered!', null)
            } else {
                const setData = {
                    code: transactionCode,
                    user_uuid: req.currentUser.uuid,
                    owner_uuid: ownerUuid,
                    room_code: roomCode,
                    room_type: roomType,
                    price: transactionPrice,
                    quantity: transactionQuantity,
                    status: 0,
                    created_at: new Date(Date.now()),
                    created_by: req.currentUser.uuid,
                    created_by_name: req.currentUser.username
                }
                const result = await transactionService.CreateTransactionService(setData)
                return helper.GetResponse(res, 200, 'A new transaction is succesfully created!', result)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async UpdateTransactionController(req, res) {
        try {
            const { transactionCode } = req.params
            const { transactionStatus } = req.body
            // let setDataTransaction = null
            const checkTransaction = await transactionService.GetTransactionService({ code: transactionCode})
            if(checkTransaction) {
                const checkRoom = await roomService.GetRoomService(checkTransaction.room_code)
                if(checkRoom) {
                    if(transactionStatus == 2) {
                        const resultQuantity = parseInt(checkRoom.quantity) - parseInt(checkTransaction.quantity) 
                        const setDataRoom = {
                            quantity: resultQuantity,
                            updated_at: new Date(Date.now()),
                            updated_by: req.currentUser.uuid,
                            updated_by_name: req.currentUser.username
                        }
                        await roomService.UpdateRoomService(checkTransaction.room_code, setDataRoom)
                        const setDataTransaction = {
                            status: transactionStatus,
                            updated_at: new Date(Date.now()),
                            updated_by: req.currentUser.uuid,
                            updated_by_name: req.currentUser.username
                        }
                        const result = await transactionService.UpdateTransactionService(transactionCode, setDataTransaction)
                        return helper.GetResponse(res, 200, 'A transaction data have been succesfully paid!', result)
                    } else if(transactionStatus == 1) {
                        const setDataTransaction = {
                            status: transactionStatus,
                            updated_at: new Date(Date.now()),
                            updated_by: req.currentUser.uuid,
                            updated_by_name: req.currentUser.username
                        }
                        const result = await transactionService.UpdateTransactionService(transactionCode, setDataTransaction)
                        return helper.GetResponse(res, 200, 'An existing transaction is succesfully updated!', result)
                    } else {
                        const setDataTransaction = {
                            status: transactionStatus,
                            updated_at: new Date(Date.now()),
                            updated_by: req.currentUser.uuid,
                            updated_by_name: req.currentUser.username
                        }
                        const result = await transactionService.UpdateTransactionService(transactionCode, setDataTransaction)
                        return helper.GetResponse(res, 200, 'An existing transaction is succesfully expired!', result)
                    }
                } else {
                    return helper.GetResponse(res, 400, 'A room data from room code is not found!', null)
                }
            } else {
                return helper.GetResponse(res, 400, 'A transaction data is not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async DeleteTransactionController(req, res) {
        try {
            const { transactionCode } = req.params
            const checkTransaction = await transactionService.GetTransactionService({ code: transactionCode})
            if(checkTransaction) {
                if(checkTransaction.status == 2) {
                    return helper.GetResponse(res, 400, 'A data cannot deleted because that transaction status is paid!', null)
                } else {
                    await transactionService.DeleteTransactionService(transactionCode)
                    return helper.GetResponse(res, 200, 'A transaction data is succesfully deleted!', null)
                }
            } else {
                return helper.GetResponse(res, 400, 'A transaction data is not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new TransactionController()