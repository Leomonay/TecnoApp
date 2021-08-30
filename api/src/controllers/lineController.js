const Line = require ('../models/Line')
const Area = require ('../models/Area')
const mongoose = require('mongoose')

async function addLine (req,res){
    try{
        const {name, code, area}=req.body;
        const bdArea = await Area.findOne({name:area}).lean().exec()
        if(bdArea.length==0){
            res.status(400).send({message: 'Area no encontrada en base de datos'})
        }else{
            const line = await Linea({
                name,
                code,
                area: mongoose.Types.ObjectId(bdArea._id)
            })
            areaStored = await line.save()

            await Area.updateOne(
                {name:bdArea.name},
                {areas:[...bdArea.areas,mongoose.Types.ObjectId(line._id)]
            })

            res.status(201).send({areaStored})    
        }
    }catch (e){
        res.status(500).send({message: e.message})
    }
}
async function getLines (req,res){
    const lines = await Line.find().lean().exec()
    res.status(200).send({lines: lines.map(e=>[e.name, e.area.name])})
}

module.exports={
    addLine,
    getLines
}