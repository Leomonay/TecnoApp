const mongoose = require('mongoose')

//----------------------------------------------------------------------------------------------------------
const objectFromArrays = function(keys,values){
    var entries =[]
    for (i=0;i<keys.length;i++){
        entries.push([keys[i],values[i]])
    }
    var obj = Object.fromEntries(new Map(entries))
    return obj
}
//----------------------------------------------------------------------------------------------------------
async function addItem (properties,index,item){
    try{
        const parentId = properties[index[item].parentType]
        var parentFound = await index[item].parentByCode(parentId)
        const parent = parentFound? parentFound: await index[item].parentByName(parentId)
        if(!parent){
            res.status(400).send({message: `${index[item].parentType} no se encuentra en base de datos`})
        }else{
            if(await index[item].check(properties.name)){
                return {status: 400, message: `${index[item].type} ${properties.name} ya existe en base de datos`}
            }else{
                const newItem = await index[item].add(properties)
                const itemStored = await newItem.save()
                await parent[index[item].ref].push(mongoose.Types.ObjectId(newItem._id))
                await parent.save()
                return{
                    status: 201,
                    item_Guardado: `${index[item].type} ${itemStored.name}`
                }
            }   
        }
    }catch (e){
        return objectFromArrays([ 'status', index[item].type, 'error' ],[500, properties.name, e.message])
    }
}
//-------------------------------------------------------------------------------------------------------------
async function deleteItem(properties,index,item){
    try{
        //define item and parent
        const itemToDelete = await index[item].self(properties.name);
        
        const parentId = properties[index[item].parentType]
        var parentFound = await index[item].parentByCode(parentId)
        const parent = parentFound? parentFound: await index[item].parentByName(parentId)
        
        //remove area from plant
        await parent[ index[item].ref ].pull(itemToDelete._id)
        await parent.save()
        //remove area
        await index[item].deleteSelf(properties.name)
        //send areas
        const storedParent = await index[item].parentByName(parentId).populate(index[item].ref).lean().exec()
        return storedParent[index[item].ref].map(e=>e.name)
    }catch(e){
        console.log(e.message)
        throw e.message
    }
}


module.exports={
    objectFromArrays,
    addItem,
    deleteItem
}