const express = require('express')
const { addLine, getLines } = require('../controllers/lineController')
const server = express.Router()

server.post('/', addLine)
server.get('/', getLines)
module.exports=server