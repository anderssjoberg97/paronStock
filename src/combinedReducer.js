import {combineReducers} from "redux";

import commonReducer from "./common/reducers/commonReducer";
import sidebarReducer from "./common/components/sidebar/reducers/sidebarReducer";
import promptReducer from "./common/components/prompt/reducers/promptReducer";
import dashboardReducer from "./dashboard/reducers/dashboardReducer";
import stockReducer from "./stock/reducers/stockReducer";
import productsReducer from "./products/reducers/productsReducer";
import deliveriesReducer from "./deliveries/reducers/deliveriesReducer";

/**
 * The main reducer which combines all other reducers
 */
export const combinedReducer = combineReducers({
    common: commonReducer,
    sidebar: sidebarReducer,
    prompt: promptReducer,
    dashboard: dashboardReducer,
    stock: stockReducer,
    products: productsReducer,
    deliveries: deliveriesReducer
});
