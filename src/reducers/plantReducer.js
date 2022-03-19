const initialState = {
    plantList:[],
    selectedPlant:'',
    plantResult:{},
}

export default function plantReducer (state = initialState,action){
    switch (action.type){
        case 'PLANT_LIST':
            return{...state, 
                plantList: action.payload,
            };
        case 'SELECTED_PLANT':
            return{...state,
                plantList: state.plantList.includes(action.payload) ? state.plantList : [...state.plantlist, ...action.payload],
                plantResult: action.payload.error ? {error: action.payload.error} : {success: action.payload},
                selectedPlant: action.payload,
            };
        case 'RESET_PLANT_RESULT':
            return{...state,
                plantResult: {},
            };
        default: return state;
    }
}