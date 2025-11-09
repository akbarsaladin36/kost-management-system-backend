const userService = require('../services/userService')
const helper = require('../helper')

class ProfileController {
    async GetProfileController(req, res) {
        try {
            const profile = await userService.GetUserService(req.currentUser.username)
            if(profile) {
                return helper.GetResponse(res, 200, 'A profile data is succesfully appeared!', profile)
            } else {
                return helper.GetResponse(res, 400, 'A profile data is not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
    async UpdateProfileController(req, res) {
        try {
            const { firstName, lastName, address, phoneNumber } = req.body
            const profile = await userService.GetUserService(req.currentUser.username)
            if(profile) {
                const setData = {
                    first_name: firstName ? firstName : profile.first_name,
                    last_name: lastName ? lastName : profile.last_name,
                    address: address ? address : profile.address,
                    phone_number: phoneNumber ? phoneNumber : profile.phone_number,
                    updated_at: new Date(Date.now()),
                    updated_by: req.currentUser.uuid,
                    updated_by_name: req.currentUser.username
                }
                const result = await userService.UpdateUserService(req.currentUser.username, setData)
                return helper.GetResponse(res, 200, 'A profile data are succesfully updated!', result)
            } else {
                return helper.GetResponse(res, 400, 'A profile data is not found!', null)
            }
        } catch(error) {
            return helper.GetResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new ProfileController()