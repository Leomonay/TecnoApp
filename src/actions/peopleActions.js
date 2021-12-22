import { appConfig } from "../config"
// const plantCode=appConfig.plantConfig.code

export function getWorkerList(){
    return async function(dispatch){
        return fetch(`${appConfig.url}/users/workers`)
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'WORKERS_LIST',
            payload: json
            })
        )
    }    
}
export function getSupervisors(){
    return async function(dispatch){
        return fetch(`${appConfig.url}/users/supervisors`)
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'SUPERVISORS',
            payload: json
            })
        )
    }    
}
export function getUserOptions(){
    return async function(dispatch){
        return fetch(`${appConfig.url}/users/options`)
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'USER_OPTIONS',
            payload: json
            })
        )
    } 
}
export function getUsersList(filters, plant){
    return async function(dispatch){
        return fetch(`${appConfig.url}/users/filtered`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({filters,plant})
        })
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'USER_LIST',
            payload: json
            })
        )
    } 
}