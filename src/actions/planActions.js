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
export function updateProgram(locate,update){
    return async function (dispatch){
        return fetch(`${appConfig.url}/program`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:locate, update:update})
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


export function getPrograms(plant){
    console.log('actionPlant', plant)
    return async function (dispatch){
        return fetch(`${appConfig.url}/program${ plant? `?plantName=${plant}` :'' }`)
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'ALL_PROGRAMS',
                payload: json
            })
        })
    }
}