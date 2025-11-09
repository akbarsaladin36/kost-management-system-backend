const authRepository = require('../repositories/authRepository')

class AuthService {
    async GetUserService(username) {
        return await authRepository.GetOneRepository(username)
    }

    async CreateUserService(setData) {
        return await authRepository.CreateRepository(setData)
    }
}

module.exports = new AuthService()