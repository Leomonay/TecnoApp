const initialState = {
    workersList:[],
    supervisors:[],
    userList:[],
    userFilters:'',
    userOptions:''
}

export default function workOrderReducer (state = initialState,action){
    switch (action.type){
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
        default: return state;
    }
}