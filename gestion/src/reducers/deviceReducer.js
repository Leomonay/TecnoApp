const initialState = {
    deviceFullList:[]
}

export default function workOrderReducer (state = initialState,action){
    switch (action.type){
        case 'FULL_DEVICE_LIST':
            return{
                ...state,
                deviceFullList: action.payload
            };
        default: return state;
    }
}