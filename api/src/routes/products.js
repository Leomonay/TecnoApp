const express = require('express')
const { addProduct, getProducts } = require('../controllers/productController')
const upload = require('../libs/storage')
const server = express.Router()

server.post('/', upload.single('image'), addProduct)
server.get('/', getProducts)
module.exports=server