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