const sidebarReducerInitalState = {
    expanded: false,
    warehouses: {
        isFetching: true,
        data: null,
    }
};

/**
 * Handles sidebar menu actions
 */
export default function sidebarReducer(state = sidebarReducerInitalState, action){
    switch(action.type){
        case "SET_SIDEBAR_EXPANDED": {
            return {
                ...state,
                expanded: action.payload.value
            }
        }
        case "REQUEST_SIDEBAR_WAREHOUSES": {
            return {
                ...state,
                warehouses: {
                    ...state.warehouses,
                    isFetching: true
                }
            };
            break;
        }
        case "RECEIVE_SIDEBAR_WAREHOUSES": {
            return {
                ...state,
                warehouses: {
                    ...state.warehouses,
                    isFetching: false,
                    data: action.payload.data
                }
            };
            break;
        }
        default: {
            break;
        }
    }
    return state;
}
