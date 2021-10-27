const Plant = require('../models/Plant');
const User = require ('../models/User')

async function addUser (req,res){
    try{
        const {username, name, idNumber, access, charge, email, phone, plantName, active}=req.body;       
        const checkUser = await User.find({username:username}).lean().exec()
        if(checkUser.length>0){
            res.status(400).send({message: 'El usuario ya existe'})
        }else{
            const newItem = await User({
                username,
                name,
                idNumber,
                access,
                charge,
                email,
                phone,
                plant: (await Plant.findOne({name: plantName}))._id,
                active,
            })
            const ItemStored = await newItem.save()
            res.status(201).send({ItemStored})
        }
    }catch (e){
        res.status(500).send({message: e.message})
    }
}

module.exports={
    addUser,
}