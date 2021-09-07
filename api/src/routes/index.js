const {Router} = require('express');
const plantRoutes = require('./plants');
const areaRoutes = require('./areas');
const lineRoutes = require ('./lines')
const {loadAreasFromCsv,
    loadLinesFromCsv,
    loadGasesFromCsv,
    createDeviceOptions,
    loadDevicesFromCsv,
    loadServicePointsFromCsv,
    loadRelationEqLsFromCsv} = require('../controllers/plantCsvController')

const server = Router();

server.use('/plants',plantRoutes)
server.use('/areas',areaRoutes)
server.use('/lines',lineRoutes)

server.post('/csvupdate', async (req,res)=>{
    // try{
        var results=[]
        results.push( await loadAreasFromCsv())
        results.push( await loadLinesFromCsv())
        results.push( await loadServicePointsFromCsv())
        // results.push( await loadGasesFromCsv())
        results.push(await createDeviceOptions())
        results.push(await loadDevicesFromCsv())
        results.push(await loadRelationEqLsFromCsv())
        console.log('results',results)
        res.status(200).send(results)
    // }catch(e){
    //     res.status(500).send(e.message)
    // }
})
module.exports = server;