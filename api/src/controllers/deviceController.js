const Plant = require('../models/Plant'); 
const Area = require('../models/Area');
const Line = require('../models/Line');
const Device = require('../models/Device');
const Refrigerante = require('../models/Refrigerante')
const ServicePoints = require('../models/ServicePoint')
const User = require ('../models/User')

async function deviceListByPlant (req,res){
    const {code} = req.query
    let deviceList=[]
    let item=''
    try{
        const plant = await Plant.findOne({code: code})
        console.log('plant',plant)
        const areas = await Area.find({_id: plant.areas})
        for await (let area of areas){
            const lines = await Line.find({_id: area.lines})
            for await (let line of lines){
                const devices = await Device.find({line: {_id:line._id}})
                    .select('-__v')
                    .populate({
                        path:'refrigerant',
                        model:Refrigerante
                    })
                    .populate({
                        path:'servicePoints',
                        model: ServicePoints
                    })
                    .lean().exec()
                // devices.splice(3)
                for await(let device of devices){
                    item=device.code+' - '+device.name
                    const newDevice = {
                        'Área': area.name,
                        'Línea': line.name,
                        'Código': device.code,
                        'Nombre': device.name,
                        'Tipo': device.type,
                        'Kcal': device.power.magnitude,
                        'Tn': device.power.magnitude/3000,
                        'Gas': device.refrigerant ? device.refrigerant.refrigerante : '',
                        'Servicio': device.service,
                        'Estado': device.status,
                        'Categoría': device.category,
                        'FechaAlta': device.regDate,
                        'Entorno': device.environment,
                        'Lugares Servicio': device.servicePoints?device.servicePoints.map(sp=>sp.name):[]
                    }
                    deviceList.push(newDevice)
                }
            }
        }
        res.status(201).send({cantidad: deviceList.length, lista: deviceList})
    }catch (e){
        res.status(500).send({item: item, message: e.message})
    }
}

module.exports={
    deviceListByPlant,
}