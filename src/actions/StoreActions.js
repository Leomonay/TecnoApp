import { appConfig } from "../apiConfig";

const token = localStorage.getItem('tecnoToken')

export function serverAction(data){
  return async function(dispatch){
    return fetch(`${appConfig.url}/${data.endpoint}`,{
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
        endpoint:`cylinders${array?`?ids=[${array}]`:``}`,
        method: 'GET',
        type: "GET_CYLINDERS"
    })
}
export function addCylinder(cylinder) {
  return serverAction({
    endpoint:`cylinders/`,
    method: 'POST',
    body: cylinder,
    type: "NEW_CYLINDER"
  })
}

export function updateCylinder(cylinder) {
  return serverAction({
    endpoint:`cylinders`,
    method: 'PUT',
    body: cylinder,
    type: 'UPDATE_CYLINDER'
  })
}

export function deleteCylinder(id){
  return serverAction({
    endpoint:`cylinders?id=${id}`,
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