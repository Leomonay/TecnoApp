const initialState = {
    tableHeaders: ['code', 'status', 'device', 'cause','solicitor', 'line', 'area', 'closed'],
    mostRecent:[],
    selected:null
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
        default: return state;
    }
}