const express = require('express')
const { addPlant, getPlants } = require('../controllers/plantController')
const api = express.Router()

api.post('/', addPlant)
api.get('/', getPlants)
module.exports=api