import {combineReducers} from "redux";


import dashboardReducer from "./dashboard/reducers/dashboardReducer";

/**
 * The main reducer which combines all other reducers
 */
export const combinedReducer = combineReducers({
    dashboard: dashboardReducer
});
