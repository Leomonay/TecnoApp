const express = require('express')
const { addUser } = require('../controllers/userController')
const server = express.Router()

server.post('/', addUser)
module.exports=server
