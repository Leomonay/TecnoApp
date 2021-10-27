import { appConfig } from "../config"

export function getDeviceList(plantCode){
    return async function(dispatch){
    return fetch(`${appConfig.url}/devices/byplant?code=${plantCode}`)
        .then(response => response.json())
        .then(json=>dispatch({
            type: 'FULL_DEVICE_LIST',
            payload: json.lista
        })
    )}
}