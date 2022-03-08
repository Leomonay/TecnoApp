import { appConfig } from "../apiConfig";

const token = localStorage.getItem('tecnoToken')

function serverAction(data){
  return async function(dispatch){
    return fetch(data.url,{
      method: data.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: 'Bearer'+token
      },
      body: JSON.stringify(data.body)
    })
    .then((response) => response.json())
    .then((json) => dispatch({type: data.type, payload:json}))
  }
}

//Cylinder Actions
export function getCylinderList(array) {
    return serverAction({
        url:`${appConfig.url}/cylinders${array?`?ids=[${array}]`:``}`,
        method: 'GET',
        type: "GET_CYLINDERS"
    })
}
export function addCylinder(cylinder) {
  return serverAction({
      url:`${appConfig.url}/cylinders/`,
      method: 'POST',
      body: cylinder,
      type: "NEW_CYLINDER"
  })
}

export function updateCylinder(cylinder) {
  return serverAction({
    url: `${appConfig.url}/cylinders`,
    method: 'PUT',
    body: cylinder,
    type: 'UPDATE_CYLINDER'
  })
}

export function deleteCylinder(id){
  return serverAction({
    url: `${appConfig.url}/cylinders?id=${id}`,
    method: 'DELETE',
    type: 'DELETE_CYLINDER'
  })
}

export function resetResult(){
  return{
    type: 'RESET_RESULT',
    payload: {}
  }
}