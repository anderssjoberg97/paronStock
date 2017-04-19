const initalState = {
    isRegisteringDelivery: false,
    shouldFetchDeliveries: true,
    isFetching: false,
    parameters: {},
    data: null
};

/**
 * Handles product actions
 */
export default function deliveriesReducer(state = initalState, action){
    switch(action.type){
        case "SET_SHOULD_FETCH_PRODUCTS": {
            return {
                ...state,
                shouldFetchProducts: action.payload.value
            };
            break;
        }
        case "REQUEST_DELIVERIES": {
            return {
                ...state,
                isFetching: true,
                shouldFetchDeliveries: false,
            };
            break;
        }
        case "RECEIVE_DELIVERIES": {
            return {
                ...state,
                isFetching: false,
                shouldFetchDeliveries: false,
                data: action.payload.data
            };
            break;
        }
        case "REQUEST_REGISTER_DELIVERY": {
            return {
                ...state,
                isRegisteringDelivery: true
            };
            break;
        }
        case "RECEIVE_REGISTER_DELIVERY_RESPONSE": {
            return {
                ...state,
                isRegisteringDelivery: false
            }
            break;
        }
        default: {
            break;
        }
    }
    return state;
}
