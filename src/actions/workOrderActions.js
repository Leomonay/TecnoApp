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

export function getWOOptions(){
    return async function(dispatch){
        return fetch(`${appConfig.url}/workorder/options`)
            .then(response => response.json())
            .then(json=>dispatch({
                type: 'GET_WO_OPTIONS',
                payload: json
            })
        )}
}

export function newWorkOrder(order){
    return async function(dispatch){
        return fetch(`${appConfig.url}/workorder/`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body:JSON.stringify(order)
        })
            .then(response => response.json())
            .then(json=>{
                dispatch({
                    type: 'NEW_ORDER',
                    payload: json.orderId
                })
            })
        }
}
export function updateOrder(code,update){
    return async function(dispatch){
        return fetch(`${appConfig.url}/workorder/${code}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body:JSON.stringify(update)
        })
            .then(response => response.json())
            .then(json=>{
                dispatch({
                    type: 'UPDATED_ORDER',
                    payload: json
                })
            })
        }
}
export function resetNewOrder(){
    return{
        type: 'NEW_ORDER',
        payload: null
    } 
}
export function searchWO(code){
    return async function(dispatch){
        return fetch(`${appConfig.url}/workorder/detail/${code}`)
            .then(response => response.json())
            .then(json=> dispatch({
                    type: 'ORDER_DETAIL',
                    payload: json
                })
            )
        }
}
export function resetDetail(){
    return{
        type: 'ORDER_DETAIL',
        payload: ''
    } 
}

export function getWOList(conditions){
    return async function(dispatch){
        return fetch(`${appConfig.url}/workorder/list`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(conditions),
        })
        .then(response => response.json())
        .then(json=> dispatch({
                type: 'ORDER_LIST',
                payload: json
            })
        )
    }
}
export function deleteOrder(code){
    return async function (dispatch){
        return fetch(`${appConfig.url}/workorder/${code}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json=> dispatch({
            type: 'DELETED_ORDER',
            payload: json
            })
        )
    }
}