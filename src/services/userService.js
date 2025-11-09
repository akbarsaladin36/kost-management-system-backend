const userRepository = require('../repositories/userRepository')

class UserService {
    async GetUsersService() {
        return await userRepository.GetAllRepository()
    }

    async GetUserService(username) {
        return await userRepository.GetOneRepository(username)
    }

    async CreateUserService(setData) {
        return await userRepository.CreateRepository(setData)
    }

    async UpdateUserService(username, setData) {
        return await userRepository.UpdateRepository(username, setData)
    }

    async DeleteUserService(username) {
        return await userRepository.DeleteRepository(username)
    }
}

module.exports = new UserService()