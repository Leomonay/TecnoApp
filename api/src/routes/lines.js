const express = require('express')
const { addLineFromApp, getLines } = require('../controllers/lineController')
const server = express.Router()

server.post('/', addLineFromApp)
server.get('/', getLines)
module.exports=server