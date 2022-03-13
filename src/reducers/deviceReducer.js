const initialState = {
    deviceFullList:[],
    deviceFilters:[],
    partialList:[],
    deviceOptions:[],
    selectedWODevice:'',
    deviceResult:{},

    deviceView:'',
    deviceHistory:{}
}

export default function deviceReducer (state = initialState,action){
    switch (action.type){
        case 'NEW_DEVICE':
            if(action.payload.error)
            if(action.payload.error) return {...state, deviceResult: {error: action.payload.error}}
            return{...state, 
                selectedWODevice: action.payload,
                deviceResult: {success: action.payload.code},
                deviceFullList: state.deviceFullList[0]? [...state.deviceFullList,action.payload] : []
            };
        case 'RESET_RESULT':{
            return{
                ...state,
                deviceResult:action.payload
            }
        }
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
        case 'DEVICE_HISTORY':
            return{
                ...state,
                deviceHistory: action.payload
            }
        default: return state;
    }
}