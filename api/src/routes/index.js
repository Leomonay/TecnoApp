const {Router} = require('express');
const productRoutes = require('./products');
const plantRoutes = require('./plants');
const areaRoutes = require('./areas');
const lineRoutes = require ('./lines')

const server = Router();

server.use('/products',productRoutes)
server.use('/plants',plantRoutes)
server.use('/areas',areaRoutes)
server.use('/lines',lineRoutes)

module.exports = server;