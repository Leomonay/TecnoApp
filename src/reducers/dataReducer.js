
const initialState = {
    data:{},
};


export default function dataReducer (state = initialState,action){
    switch (action.type){
        // case 'SELECT_WO':
        //     return{
        //         ...state,
        //         workorder: {...state.workOrder,selected: action.payload}
        //     };
        default: return state;
    }
}