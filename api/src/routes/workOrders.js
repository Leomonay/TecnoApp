const express = require('express')
const { getMostRecent } = require('../controllers/workOrderController')
const server = express.Router()

server.post('/mostrecent', getMostRecent)

module.exports=server
