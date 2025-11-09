const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const helper = require('../helper')
const authService = require('../services/authService')
dotenv.config()

class AuthController {
    async RegisterController(req, res) {
        try {
            const { username, email, password, confirmPassword } = req.body
            const checkUser = await authService.GetUserService(username)
            if(checkUser) {
                return helper.GetResponse(res, 400, 'A username have been registered!')
            } else {
                if(password != confirmPassword) return helper.GetResponse(res, 400, 'Password and confirm password must match!')
                const hashPassword = helper.HashPassword(password)
                const uuid = helper.GenerateUUID()
                const setData = {
                    uuid: uuid,
                    username: username,
                    email: email,
                    password: hashPassword,
                    role: 0,
                    status: 0,
                    created_at: new Date(Date.now()),
                    created_by: uuid,
                    created_by_name: username
                }
                const result = await authService.CreateUserService(setData)
                return helper.GetResponse(res, 200, 'A new user is succesfully created!', result)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }

    async LoginController(req, res) {
        try {
            const { username, password } = req.body
            const checkUser = await authService.GetUserService(username)
            if(checkUser) {
                 const checkPassword = helper.CheckPassword(password, checkUser.password)
                 if(checkPassword) {
                    const payload = {
                        uuid: checkUser.uuid,
                        username: checkUser.username,
                        password: checkUser.password,
                        email: checkUser.email,
                        role: checkUser.role
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME }) 
                    const result = {...payload, token }
                    return helper.GetResponse(res, 200, 'A user are succesfully login!', result)
                 } else {
                    return helper.GetResponse(res, 400, 'A password are incorrect. Please try again!')
                 }
            } else {
                return helper.GetResponse(res, 400, 'A username are not registered! Please register first!')
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message)
        }
    }
}

module.exports = new AuthController()