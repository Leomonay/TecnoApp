
const initialState = {};


export default function dataReducer (state = initialState,action){
    switch (action.type){
        case 'UPDATE_DATA':
        return{
            ...state,
            data: action.payload
        };
        default: return state;
    }
}

export const selectActiveWord = state=>state.palabraReducer.palabra;