const express = require('express')
const { addArea, getAreas } = require('../controllers/areaController')
const server = express.Router()

server.post('/', addArea)
server.get('/', getAreas)
module.exports=server