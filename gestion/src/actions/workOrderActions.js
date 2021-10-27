import { appConfig } from "../config"

export function selectWorkOrder(ot){
    return{
        type: 'SELECT_WO',
        payload: ot
    }
}
export function callMostRecent(filters){
    return async function(dispatch){
    return fetch(`${appConfig.url}/workorder/mostrecent`,{
        method:'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body:JSON.stringify(filters)
    })
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'MOST_RECENT',
            payload: json
        })
    )}
}