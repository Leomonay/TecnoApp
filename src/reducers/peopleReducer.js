const initialState = {
    workersList:[],
    supervisors:[]
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
            }
        default: return state;

    }
}