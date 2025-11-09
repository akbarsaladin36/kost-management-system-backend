const transactionRepository = require('../repositories/transactionRepository')

class TransactionService {
    async GetTransactionsService() {
        return await transactionRepository.GetAllRepository()
    }
    async GetTransactionsByOwnerService(ownerUuid) {
        return await transactionRepository.GetAllByOwnerRepository(ownerUuid)
    }
    async GetTransactionsByUserService(userUuid) {
        return await transactionRepository.GetAllByUserRepository(userUuid)
    }
    async GetTransactionService(condition) {
        return await transactionRepository.GetOneRepository(condition)
    }
    async CreateTransactionService(setData) {
        return await transactionRepository.CreateRepository(setData)
    }
    async UpdateTransactionService(transactionCode, setData) {
        return await transactionRepository.UpdateRepository(transactionCode, setData)
    }
    async DeleteTransactionService(transactionCode) {
        return await transactionRepository.DeleteRepository(transactionCode)
    }
}

module.exports = new TransactionService()