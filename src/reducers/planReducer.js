const initialState = {
    newProgram:'',
    programList:[]
}

export default function planReducer (state = initialState,action){
    switch (action.type){
        case 'NEW_PROGRAM':
            return{
                ...state,
                newProgram: action.payload
            };
        case 'ALL_PROGRAMS':
            return{
                ...state,
                programList: action.payload
            };
        default: return state;
    }
}