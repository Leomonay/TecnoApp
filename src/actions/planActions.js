import { appConfig } from "../config"

export function createProgram(object){
    return async function (dispatch){
        return fetch(`${appConfig.url}/program`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'NEW_PROGRAM',
                payload: json
            })
        })
    }
}

export function updateProgram(programId,update){
    return async function (dispatch){
        return fetch(`${appConfig.url}/program/`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: programId, update})
        })
        .then(response=>response.json())
        .then(json=>{
            if(!json.error)dispatch({
                type: 'UPDATE_PROGRAM',
                payload: json
            })
        })
    }
}
export function updatePlan(update){
    return async function (dispatch){
        return fetch(`${appConfig.url}/program/devices`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update)
        })
        .then(response=>response.json())
        .then(json=>{
            if(json.errors.length>0)alert(`Error${json.error.length>1&&'es'}:` + json.error.map(item=>`${item.code}: ${item.detail}`))
            if(json.updated.device.length>0)dispatch({
                    type: 'UPDATE_DEVICE_PLAN',
                    payload: json.updated
                })
        })
    }
}

export function getPrograms(conditions){
    return async function (dispatch){
        
        const {plant, year} = conditions
        let filter = (plant||year) ? '?' : ''
        if(plant) filter+='plantName='+plant
        if(plant&&year)filter+='&'
        if(year)filter+='year='+year

        return fetch(`${appConfig.url}/program${filter}`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'ALL_PROGRAMS',
                payload: json
            })
        })
    }
}

export function getPlanDevices(conditions){

    return async function (dispatch){
        const {plant, year} = conditions
        let filter = (plant||year) ? '?' : ''
        if(plant) filter+='plant='+plant
        if(plant&&year)filter+='&'
        if(year)filter+='year='+year
        return fetch(`${appConfig.url}/program/devices${filter}`
        )
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'PLAN_DEVICES',
                payload: json
            })
        })
    }
}

export function createPlan(planDevices){
    return async function (dispatch){
        return fetch(`${appConfig.url}/program/devices`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(planDevices)
        })
        .then(response=>response.json())
        .then(json=>{
            if(json.errors.length>0)alert(`Error${json.error.length>1&&'es'}:` + json.error.map(item=>`${item.code}: ${item.detail}`))
            if(json.created.device.length>0)
            dispatch({
                type: 'UPDATE_DEVICE_PLAN',
                payload: json.created
            })
        })
    }
}