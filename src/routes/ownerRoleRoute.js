const express = require('express')
const Route = express.Router()
const roomRoute = require('../routes/owner/roomRoute')
const transactionRoute = require('../routes/owner/transactionRoute')
const profileRoute = require('../routes/owner/profileRoute')

Route.use("/rooms", roomRoute)
Route.use("/transactions", transactionRoute)
Route.use("/profile", profileRoute)

module.exports = Route