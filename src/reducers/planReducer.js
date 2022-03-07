const initialState = {
    programList:[],
    devicePlanList:[],
    planResult:'',
    calendar: undefined,
    selectedTask: {},
    plan:[]
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
            list = state.programList.filter(element=>
                element.name!==action.payload.name
                )
            list.push(action.payload)
            return{
                ...state,
                programList: list.sort( (a,b)=>a.name > b.name ? 1:-1 )
            }
        case 'DATES':
            return{
                ...state,
                calendar: action.payload
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
            const {device, strategy} = action.payload
            return{
                ...state,
                devicePlanList: state.devicePlanList.map(element=>{
                    if( device.includes(element.code) ){
                        if(!element.program)element.program={}
                        Object.keys(strategy).map(key=>element.program[key] = strategy[key])
                    }
                    return element
                })
            }
        case 'UPDATE_DATE':
            const detail = action.payload
            const index = state.devicePlanList.findIndex(e=>e.date===detail.date && e.code===detail.code)

            return{
                ...state={
                devicePlanList: [...state.devicePlanList][index]=detail
                }
            }
        case 'GET_PLAN':
            return{
                ...state,
                plan: action.payload
            }
        case 'SELECT_TASK':
            return{
                ...state,
                selectedTask: action.payload
            }

        default: return state;
    }
}