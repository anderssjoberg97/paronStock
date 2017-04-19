const initalState = {
    shouldFetchProducts: true,
    isAddingProduct: false,
    isFetching: false,
    parameters: {},
    data: null
};

/**
 * Handles product actions
 */
export default function productsReducer(state = initalState, action){
    console.log(action.type);
    switch(action.type){
        case "SET_SHOULD_FETCH_PRODUCTS": {
            return {
                ...state,
                shouldFetchProducts: action.payload.value
            };
            break;
        }
        case "REQUEST_PRODUCTS": {
            return {
                ...state,
                isFetching: true,
                shouldFetchProducts: false,
            };
            break;
        }
        case "RECEIVE_PRODUCTS": {
            return {
                ...state,
                isFetching: false,
                shouldFetchProducts: false,
                data: action.payload.data
            };
            break;
        }
        case "REQUEST_ADD_PRODUCT": {
            return {
                ...state,
                isAdding: true
            };
            break;
        }
        case "RECEIVE_ADD_PRODUCT_RESPONSE": {
            return {
                ...state,
                isAdding: false
            }
            break;
        }
        default: {
            break;
        }
    }
    return state;
}
