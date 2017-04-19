import fetch from "isomorphic-fetch";


/**
 * Sends request to the backend asking for stock status
 */
export function requestStock(parameters){
    return {
        type: "REQUEST_STOCK",
        payload: {
            parameters: parameters
        }
    };
}

/**
 * Fetches stock status from backend
 */
export function fetchStock(parameters){
    return (dispatch) => {
        dispatch(requestStock(parameters));
        return fetch(process.env.SERVICE_URL + "data/stock", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...parameters,
                action: "get"
            })
        })
            .then((response) => response.json())
            .then(json => dispatch(receiveStock(json)));
    };
}

/**
 * Handles the result of fetchStock
 */
export function receiveStock(data){
    return {
        type: "RECEIVE_STOCK",
        payload: {
            warehouses: data.warehouses,
            data: data.data
        }
    };
}
