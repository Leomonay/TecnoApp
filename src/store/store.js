import {createStore,combineReducers, applyMiddleware, compose} from 'redux'
import dataReducer from '../reducers/dataReducer';
import workOrderReducer from '../reducers/workOrderReducer';
import deviceReducer from '../reducers/deviceReducer';
import peopleReducer from '../reducers/peopleReducer';
import addPlantsReducer from '../reducers/addPlantsReducer'
import planReducer from '../reducers/planReducer'
import adminCilindesReducer from '../reducers/adminCylindersReducer';
import abmDevicesReducer from '../reducers/abmDevices';
import thunk from 'redux-thunk'

const reducers = combineReducers({
    data: dataReducer,
    workOrder: workOrderReducer,
    devices: deviceReducer,
    people: peopleReducer,
    addPlants: addPlantsReducer,
    plan: planReducer,
    adminCylinders: adminCilindesReducer,
    abmDevices: abmDevicesReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk))
);
export default store