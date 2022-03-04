import {
  filterByWorker,
  filterByRefrigerant,
  filterByStatus,
} from "../utils/utils";
const initialState = {
  cylinders: [],
  workers: [],
  refrigerants: [],
  allCylinders: [],
  cylinderData: {},
};

export default function adminCilindesReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CYLINDERS":
      return {
        ...state,
        cylinders: action.payload,
        allCylinders: action.payload,
      };

    case "GET_WORKERS":
      let empleados = action.payload
        .filter(
          (element) =>
            (element.access === "Worker" || element.access === "Supervisor") &&
            element.active
        )
        .map((element) => {
          return { id: element.id, name: element.name };
        });
      return {
        ...state,
        workers: empleados,
      };

    case "GET_REFRIGERANTS":
      let refrigerants = action.payload.map((element) => {
        return {
          id: element._id,
          code: element.code,
          refrigerante: element.refrigerante,
        };
      });
      return {
        ...state,
        refrigerants: refrigerants,
      };

    case "ALL_FILTERS":
      let filtered = state.allCylinders;
      let worker = "";
      if (action.payload.worker !== "All") {
        if (action.payload.worker !== "Stock") worker = action.payload.worker;

        filtered = filterByWorker(worker, filtered);
      }

      if (action.payload.refrigerant !== "All") {
        filtered = filterByRefrigerant(action.payload.refrigerant, filtered);
      }

      if (action.payload.status !== "All") {
        filtered = filterByStatus(action.payload.status, filtered);
      }
      return {
        ...state,
        cylinders: filtered,
      };

    case "CYLINDER_DATA":
      let cylData = state.allCylinders.filter(
        (element) => element._id === action.payload
      );
      return {
        ...state,
        cylinderData: cylData[0],
      };

    default:
      return state;
  }
}
