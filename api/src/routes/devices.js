const express = require('express')
const { deviceListByPlant } = require('../controllers/deviceController')
const server = express.Router()

server.get('/byplant', deviceListByPlant)
module.exports=server