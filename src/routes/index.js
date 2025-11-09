const express = require('express')
const Route = express.Router()
const authRoute = require('./auth/authRoute')
const adminRoleRoute = require('./adminRoleRoute')
const ownerRoleRoute = require('./ownerRoleRoute')
const userRoleRoute = require('./userRoleRoute')

Route.use('/auth', authRoute)
Route.use('/admin', adminRoleRoute)
Route.use('/owner', ownerRoleRoute)
Route.use('/user', userRoleRoute)


module.exports = Route

