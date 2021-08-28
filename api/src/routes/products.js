const express = require('express')
const { addProduct, getProducts } = require('../controllers/productController')
const upload = require('../libs/storage')
const api = express.Router()

api.post('/products', upload.single('image'), addProduct)
api.get('/products', getProducts)
module.exports=api