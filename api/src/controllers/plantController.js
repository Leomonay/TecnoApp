const Plant = require ('../models/Plant')
//const Area = require ('../models/Area')

async function addPlant (req,res){
    try{
        const {name}=req.body;       
        const checkPlant = await Plant.find({name:name}).lean().exec()
        if(checkPlant.length>0){
            res.status(400).send({message: 'La planta ya existe'})
        }else{
            const plant = Plant({name})
            const plantStored = await plant.save()
            res.status(201).send({plantStored})
        }
    }catch (e){
        res.status(500).send({message: e.message})
    }
}
async function getPlants (req,res){
    console.log('getting plants')
    const plants = await Plant.find().lean().exec()
//    const plants = await Plant.find().lean().populate({path:'areas',select:'Area.name'}).exec()
    console.log(plants)
    res.status(200).send({plants})
}

module.exports={
    addPlant,
    getPlants
}