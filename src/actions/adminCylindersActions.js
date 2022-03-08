import { appConfig } from "../apiConfig";

export function getCylinderList(array) {
  return async function (dispatch) {
    return fetch(`${appConfig.url}/cylinders${array?`?ids=${array}`:``}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "GET_CYLINDERS",
          payload: json,
        });
      });
  };
}

export function getEmpleados() {
  return async function (dispatch) {
    return await fetch(`${appConfig.url}/users/`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "GET_WORKERS",
          payload: json,
        });
      });
  };
}

export function getRefrigerants() {
  return async function (dispatch) {
    return await fetch(`${appConfig.url}/cylinders/refrigerant`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "GET_REFRIGERANTS",
          payload: json,
        });
      });
  };
}

export function addCylinder(cylinder) {
  return async function (dispatch) {
    return fetch(`${appConfig.url}/cylinders/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cylinder),
    })
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  };
}

export const allFilters = (payload) => {
  return {
    type: "ALL_FILTERS",
    payload: payload,
  };
};

export const getCylinderData = (payload) => {
  return {
    type: "CYLINDER_DATA",
    payload: payload,
  };
};

export function updateCylinder(cylinder) {
  return async function (dispatch) {
   return fetch(`${appConfig.url}/cylinders/update`, {
     method: "PUT",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(cylinder),
   })
     .then((response) => response.json())
     .then((json) => {
       return (json);
     });
 };
}

export function deleteCylinder(cylinder) {
  return async function (dispatch) {
   return fetch(`${appConfig.url}/cylinders/delete`, {
     method: "DELETE",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(cylinder),
   })
     .then((response) => response.json())
     .then((json) => {
       return (json);
     });
 };
}
export function resetCylinderList(){
  return {
    type: "GET_CYLINDERS",
    payload: [],
  };
}