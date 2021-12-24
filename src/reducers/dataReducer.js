
const initialState = {
    data:{},
    locationTree:{},
    servicePointList:[],
    plantName:''
};


export default function dataReducer (state = initialState,action){
    switch (action.type){
        case 'TREE_PLANTS':
            return{
                ...state,
                locationTree: action.payload
            };    
        case 'LOCATION_TREE':
            return{
                ...state,
                locationTree: {...state.locationTree,[action.payload.plant]:action.payload.tree}
            };
        case 'LINE_SERVICE_POINTS':
            return{
                ...state,
                servicePointList: action.payload
            }
        case 'PLANT_NAME':
            return{
                ...state,
                plantName: action.payload
            }
        default: return state;
    }
}