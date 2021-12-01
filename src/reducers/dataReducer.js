
const initialState = {
    data:{},
    userData:'',
    locationTree:{},
    servicePointList:[]
};


export default function dataReducer (state = initialState,action){
    switch (action.type){
        case 'USER_DATA':
            return{
                ...state,
                userData: action.payload
            };
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
        default: return state;
    }
}