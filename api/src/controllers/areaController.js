const Area = require ('../models/Area')
const Plant = require ('../models/Plant')
const mongoose = require('mongoose')

async function addArea (req,res){
    try{
        const {name,plant}=req.body;
        const bdPlant = await Plant.findOne({name:plant}).lean().exec()
        if(bdPlant.length==0){
            res.status(400).send({message: 'La planta indicada no existe'})
        }else{
            const area = await Area({
                name,
                plant: mongoose.Types.ObjectId(bdPlant._id)
            })
            areaStored = await area.save()

            await Plant.updateOne(
                {name:bdPlant.name},
                {areas:[...bdPlant.areas,mongoose.Types.ObjectId(area._id)]
            })

            res.status(201).send({areaStored})    
        }
    }catch (e){
        res.status(500).send({message: e.message})
    }
}
async function getAreas (req,res){
    console.log('getting areas')
    const areas = await Area.find().lean().exec()
    //find: mongoose method - lean: convert to JS class - exec: execute query
    res.status(200).send({areas: areas.map(e=>[e.name, e.plant.name])})
}

module.exports={
    addArea,
    getAreas
}