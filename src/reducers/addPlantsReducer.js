const initialState = {
  plants: [],
  areas: [],
  lines: [],
  servicePoints: [],
  locationTree: {},
  actualData: {},
};

export default function addPlantsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PLANTS":
      let plants = Object.keys(action.payload);
      return {
        ...state,
        plants: plants,
        areas: [],
        lines: [],
        servicePoints: [],
      };
    case "GET_LOCATIONS":
      console.log("Location Tree", action.payload);
      let areas = Object.keys(action.payload);
      return {
        ...state,
        areas: areas,
        lines: [],
        servicePoints: [],
        locationTree: action.payload,
      };

    case "GET_LINES":
      let lines = state.locationTree[action.payload];
      return {
        ...state,
        lines: lines,
        servicePoints: [],
      };
    case "GET_SERVICEPOINTS":
      return {
        ...state,
        servicePoints: action.payload,
      };
    case "ACTUAL_DATA":
      return {
        ...state,
        actualData: action.payload,
      };
    default:
      return state;
  }
}
