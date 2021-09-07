const Line = require ('../models/Line')
const Area = require ('../models/Area')
const {index} = require ('../utils/tablesIndex.js')
const {addItem} = require ('../utils/utils.js')
const mongoose = require('mongoose')

async function checkLine(lineName){
    return line.check(lineName)
}

async function addLineFromApp(req,res){
    const {lines} = req.body
    let results = []
    for await (line of lines){
        const result = await addItem(line,index,'line')
        results.push(result)
    }    
    res.status(200).send(results)
}

async function getLines (req,res){
    const lines = await Line.find().lean().exec()
    res.status(200).send({lines: lines.map(e=>[e.name, e.area.name])})
}

module.exports={
    addLineFromApp,
    getLines,
    checkLine,
}