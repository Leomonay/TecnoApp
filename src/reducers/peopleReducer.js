const initialState = {
    workersList:[]
}

export default function workOrderReducer (state = initialState,action){
    switch (action.type){
        case 'WORKERS_LIST':
            return{
                ...state,
                workersList: action.payload
            };
        default: return state;
    }
}