const express = require('express')
const Route = express.Router()
const userRoute = require('./admin/userRoute')
const roomRoute = require('./admin/roomRoute')
const transactionRoute = require('./admin/transactionRoute')
const profileRoute = require('./admin/profileRoute')

Route.use('/users', userRoute)
Route.use('/rooms', roomRoute)
Route.use('/transactions', transactionRoute)
Route.use('/profile', profileRoute)
 
module.exports = Route