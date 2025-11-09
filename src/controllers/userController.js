const helper = require('../helper')
const userService = require('../services/userService')

class UserController {
    async GetUsersController(req, res) {
        try {
            const users = await userService.GetUsersService()
            if(users.length > 0) {
                return helper.GetResponse(res, 200, 'All users are succesfully appeared!', users)
            } else {
                return helper.GetResponse(res, 200, 'All users are empty!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async GetUserController(req, res) {
        try {
            const { username } = req.params
            const user = await userService.GetUserService(username)
            if(user) {
                return helper.GetResponse(res, 200, 'A user data is succesfully appeared!', user)
            } else {
                return helper.GetResponse(res, 400, 'A user data is not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async CreateUserController(req, res) {
        try {
            const { username, email, password, confirmPassword, role } = req.body
            const checkUser = await userService.GetUserService(username)
            if(checkUser) {
                return helper.GetResponse(res, 400, 'A user data are registered!', null)
            } else {
                if(password != confirmPassword) return helper.GetResponse(res, 400, 'Password and confirm password must match!')
                const hashPassword = helper.HashPassword(password)
                const uuid = helper.GenerateUUID()
                const setData = {
                    uuid: uuid,
                    username: username,
                    email: email,
                    password: hashPassword,
                    role: role,
                    status: 0,
                    created_at: new Date(Date.now()),
                    created_by: req.currentUser.uuid,
                    created_by_name: req.currentUser.username
                }
                const result = await userService.CreateUserService(setData)
                return helper.GetResponse(res, 200, 'A new user are succesfully created!', result)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async UpdateUserController(req, res) {
        try {
            const { username } = req.params
            const { firstName, lastName, address, phoneNumber, status } = req.body
            const checkUser = await userService.GetUserService(username)
            if(checkUser) {
                const setData = {
                    first_name: firstName ? firstName : checkUser.first_name,
                    last_name: lastName ? lastName : checkUser.last_name,
                    address: address ? address : checkUser.address,
                    phone_number: phoneNumber ? phoneNumber : checkUser.phone_number,
                    status: status ? status : checkUser.status,
                    updated_at: new Date(Date.now()),
                    updated_by: req.currentUser.uuid,
                    updated_by_name: req.currentUser.username
                }
                const result = await userService.UpdateUserService(username, setData)
                return helper.GetResponse(res, 200, 'An existing user are succesfully updated!', result)
            } else {
                return helper.GetResponse(res, 400, 'A user data are not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async DeleteUserController(req, res) {
        try {
            const { username } = req.params
            const checkUser = await userService.GetUserService(username)
            if(checkUser) {
                await userService.DeleteUserService(username)
                return helper.GetResponse(res, 200, 'An existing user data are succesfully deleted!', null)
            } else {
                return helper.GetResponse(res, 400, 'A user data are not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new UserController()