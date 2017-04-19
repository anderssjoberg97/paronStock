import fetch from "isomorphic-fetch";


/**
 * Sends request to the backend asking for warehouse info
 */
export function requestWarehouses(){
    return {
        type: "REQUEST_WAREHOUSES",
        payload: {

        }
    };
}

/**
 * Fetches the warehouse info from the backend
 */
export function fetchWarehouses(){
    return (dispatch) => {
        dispatch(requestWarehouses());
        return fetch(process.env.SERVICE_URL + "data/warehouses", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "get"
            })
        })
            .then((response) => response.json())
            .then(json => dispatch(receiveWarehouses(json)));
    };
}

/**
 * Handles the result of fetchWarehouses
 */
export function receiveWarehouses(data){
    return {
        type: "RECEIVE_WAREHOUSES",
        payload: {
            data: data
        }
    };
}
