const initialState = {
    deviceFullList:[],
    deviceFilters:[],
    partialList:[],
    deviceOptions:'',
    selectedWODevice:'',
    deviceView:''
}

export default function deviceReducer (state = initialState,action){
    switch (action.type){
        case 'FULL_DEVICE_LIST':
            return{
                ...state,
                deviceFullList: action.payload
            };
        case 'PARTIAL_LIST':
            return{
                ...state,
                partialList: action.payload
            };
        case 'DEVICE_FILTERS':
            return{
                ...state,
                deviceFilters: action.payload
            };
        case 'DEVICE_VIEW':
            return{
                ...state,
                deviceView: action.payload
            };  
        case 'DEVICE_WORK_ORDER_DETAIL':
            return{
                ...state,
                selectedWODevice: action.payload
            };
        case 'DEVICE_OPTIONS':
            return{
                ...state,
                deviceOptions: action.payload
            }
        default: return state;
    }
}