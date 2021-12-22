const initialState = {
    tableHeaders: ['code', 'status', 'device', 'cause','solicitor', 'line', 'area', 'closed'],
    mostRecent:[],
    selected:null,
    workOrderOptions:{},
    workOrderList:[],
    orderDetail:{},
    newOrderId:'',
    updateResult:'',
}

export default function workOrderReducer (state = initialState,action){
    switch (action.type){
        case 'MOST_RECENT':
            return{
                ...state,
                mostRecent: action.payload
            };
        case 'SELECT_WO':
            return{
                ...state,
                selected: action.payload
            };
        case 'GET_WO_OPTIONS':
            return{
                ...state,
                workOrderOptions: action.payload
            }; 
        case 'NEW_ORDER':
            return{
                ...state,
                newOrderId: action.payload
            };
        case 'ORDER_LIST':
            return{
                ...state,
                workOrderList: action.payload
            };
        case 'ORDER_DETAIL':
            return{
                ...state,
                orderDetail: action.payload
            };
        case 'UPDATED_ORDER':
            return{
                ...state,
                updateResult: action.payload
            }                
        default: return state;
    }
}