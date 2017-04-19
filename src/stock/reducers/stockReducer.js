const initalState = {
    isFetching: true,
    data: null,
    warehouses: null
};

/**
 * Handles product actions
 */
export default function stockReducer(state = initalState, action){
    switch(action.type){
        case "REQUEST_STOCK": {
            return {
                ...state,
                isFetching: true
            };
            break;
        }
        case "RECEIVE_STOCK": {
            return {
                ...state,
                isFetching: false,
                data: action.payload.data,
                warehouses: action.payload.warehouses
            };
            break;
        }
        default: {
            break;
        }
    }
    return state;
}
