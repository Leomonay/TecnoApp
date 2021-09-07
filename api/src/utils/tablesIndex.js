const {objectFromArrays} = require('./utils.js')
const Plant = require ('../models/Plant')
const Area = require ('../models/Area')
const Line = require ('../models/Line')

const index ={
    area: {
        properties: (object)=>{return objectFromArrays(['name','code'],[object.name, object.code])},
        check: async(areaName)=>{return await Area.findOne({name:areaName})},
        self: async(areaName)=>{return await Area.findOne({name:areaName}).lean().exec()},
        add: async(properties)=> {return await Area(properties)},
        type: 'Área',
        ref: 'areas',
        parentType: 'plant',
        parentByName: async(plantName)=>{return await Plant.findOne({name:plantName})},
        parentByCode: async(plantCode)=>{return await Plant.findOne({code:plantCode})},
        deleteSelf: async(areaName)=>await Area.deleteOne(areaName),
        //parentPopulated:
    },

    line: {
        properties: (object)=>{return objectFromArrays(['name','code'],[object.name, object.code])},
        check: async(lineName)=>{return await Line.findOne({name:lineName})},
        self: async(lineName)=>{return await Line.findOne({name:lineName}).lean().exec()},
        add: async(properties)=> {return await Line(properties)},
        type: 'Línea',
        ref: 'lines',
        parentType: 'area',
        parentByName: async(areaName)=>{return await Area.findOne({name:areaName})},
        parentByCode: async(areaCode)=>{return await Area.findOne({code:areaCode})}
    }
}
module.exports={index}
