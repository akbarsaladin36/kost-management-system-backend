const express = require('express')
const Route = express.Router()
const profileRoute = require('./user/profileRoute')
const roomRoute = require('./user/roomRoute')
const transactionRoute = require('./user/transactionRoute')

Route.use("/profile", profileRoute)
Route.use("/rooms", roomRoute)
Route.use("/transactions", transactionRoute)

module.exports = Route