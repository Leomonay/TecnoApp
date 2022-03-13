// import { appConfig } from "../apiConfig";

// export function getDevicesList(selectedData) {
//   return async function (dispatch) {
//       if(selectedData.linesName !== "")
//     {return fetch(`${appConfig.url}/abmdevices/devicelist?line=${selectedData.linesName}&sp=${selectedData.spName}`)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({
//           type: "GET_ALLDEVICES",
//           payload: json,
//         });
//         return json;
//       });}
//   };
// }

// export function getOptionsList() {
//   return async function (dispatch) {
//     return fetch(`${appConfig.url}/abmdevices/options`)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({
//           type: "GET_ALLOPTIONS",
//           payload: json,
//         });
//       });
//   };
// }

// export function addDevice(device) {
//   return async function (dispatch) {
//     return fetch(`${appConfig.url}/abmdevices/`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(device),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         return json;
//       });
//   };
// }

// export function deleteDevice(device) {
//   return async function (dispatch) {
//    return fetch(`${appConfig.url}/abmdevices/delete`, {
//      method: "DELETE",
//      headers: {
//        Accept: "application/json",
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify(device),
//    })
//      .then((response) => response.json())
//      .then((json) => {
//        return (json);
//      });
//  };
// }

// export const getDeviceData = (payload) => {
//   return {
//     type: "DEVICE_DATA",
//     payload: payload,
//   };
// };

// export const resetDeviceData = (payload) => {
//   return {
//     type: "RESET_DEVICE_DATA",
//     payload: payload,
//   };
// };

// export function updateDevice(device) {
//   return async function (dispatch) {
//    return fetch(`${appConfig.url}/abmdevices/update`, {
//      method: "PUT",
//      headers: {
//        Accept: "application/json",
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify(device),
//    })
//      .then((response) => response.json())
//      .then((json) => {
//        return (json);
//      });
//  };
// }