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
export function getUsersList(filters){
    return async function(dispatch){
        return fetch(`${appConfig.url}/users/filtered`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({filters})
        })
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'USER_LIST',
            payload: json
            })
        )
    } 
}
export function updateUser(idNumber, update){
    return async function(dispatch){
        return fetch(`${appConfig.url}/users/detail/${idNumber}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(update)
        })
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'SELECTED_USER',
            payload: json
            })
        )
    } 
}
export function addUser(user){
    console.log('action user', user)
    return async function (dispatch){
        return fetch(`${appConfig.url}/users`,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response=>response.json())
        .then(json=>{
            dispatch({
                type: 'NEW_USER',
                payload: json
            })
        })
    }
}