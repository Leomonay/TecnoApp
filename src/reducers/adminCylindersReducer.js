const initialState = {
  workers: [],
  refrigerants: [],
  allCylinders: [],
  cylinderResult: {}
};

export default function adminCilindesReducer(state = initialState, action) {
  let cylindersList = [...state.allCylinders]
  let index = undefined

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

    case 'DELETE_CYLINDER':
      index = state.allCylinders.findIndex(e=>e.id === action.payload.id)
      cylindersList.splice(index,1)    
      return{
        ...state,
        allCylinders: cylindersList
      }

    case "UPDATE_CYLINDER":
      index = state.allCylinders.findIndex(e=>e.id === action.payload.id)
      cylindersList[index] = {...action.payload, assignedTo: action.payload.user}
      return{
        ...state,
        allCylinders: cylindersList
      }

    case "NEW_CYLINDER":
    cylindersList.push(action.payload)
      return{
        ...state,
        allCylinders: cylindersList.sort((a,b)=>a.code>b.code?1:-1),
        cylinderResult: action.payload
      }

    default:
      return state;
  }
}
