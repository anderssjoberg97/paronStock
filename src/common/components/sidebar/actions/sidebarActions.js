import fetch from "isomorphic-fetch";


/**
 * Set sidebar expand
 */
export function setSidebarExpanded(value){
    return {
        type: "SET_SIDEBAR_EXPANDED",
        payload: {
            value: value
        }
    };

}

/**
 * Sends request to the backend asking for warehouse info
 */
export function requestSidebarWarehouses(){
    return {
        type: "REQUEST_SIDEBAR_WAREHOUSES",
        payload: {

        }
    };
}

/**
 * Fetches the warehouse info from the backend
 */
export function fetchSidebarWarehouses(){
    return (dispatch) => {
        dispatch(requestSidebarWarehouses());
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
            .then(json => dispatch(receiveSidebarWarehouses(json)));
    };
}

/**
 * Handles the result of fetchSidebarWarehouses
 */
export function receiveSidebarWarehouses(data){
    return {
        type: "RECEIVE_SIDEBAR_WAREHOUSES",
        payload: {
            data: data
        }
    };
}
