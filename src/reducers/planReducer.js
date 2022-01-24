const initialState = {
    // newProgram:'',
    programList:[],
    devicePlanList:[],
    planResult:''
}

export default function planReducer (state = initialState,action){
    let list =[]
    switch (action.type){
        case 'NEW_PROGRAM':
            list = [...state.programList]
            list.push(action.payload)
                return{
                ...state,
                programList: list.sort( (a,b)=>a.name>b.name?1:-1 )
            };
        case 'UPDATE_PROGRAM':
            list = state.programList.filter(element=>element._id!==action.payload._id)
            list.push(action.payload)
            return{
                ...state,
                programList: list.sort( (a,b)=>a.name > b.name ? 1:-1 )
            }
        case 'ALL_PROGRAMS':
            return{
                ...state,
                programList: action.payload.sort( (a,b)=>a.name>b.name ? 1 : -1 )
            };
        case 'PLAN_DEVICES':
            return{
                ...state,
                devicePlanList: action.payload
            };
        case 'UPDATE':
            return{
                ...state,
                planResult: action.payload
            }
        case 'UPDATE_DEVICE_PLAN':
            const {device, program} = action.payload
            return{
                ...state,
                devicePlanList: state.devicePlanList.map(element=>{
                    if(!element.program)element.program={}
                    if( device.includes(element.code) ){
                        Object.keys(program).map(key=> element.program[key] = program[key])
                    }
                    return element
                })
            }

        default: return state;
    }
}