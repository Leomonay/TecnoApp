const initialState = {
    workersList:[],
    supervisors:[],
    userData:'',
    userList:[],
    userFilters:'',
    userOptions:'',
    selectedUser:''
}

export default function workOrderReducer (state = initialState,action){
    switch (action.type){
        case 'USER_DATA':
            return{
                ...state,
                userData: action.payload
            };
        case 'WORKERS_LIST':
            return{
                ...state,
                workersList: action.payload
            };
        case 'SUPERVISORS':
            return{
                state,
                supervisors: action.payload
            };
        case 'USER_LIST':
            return{
                ...state,
                userList: action.payload
            };
        case 'USER_OPTIONS':
            return{
                ...state,
                userOptions: action.payload
            }
        case 'SELECTED_USER':
            return{
                ...state,
                selectedUser: action.payload
            }    
        default: return state;
    }
}