import fetch from "isomorphic-fetch";

import {closePrompt} from "./../../common/components/prompt/actions/promptActions";

/**
 * Signals that product data should be fetched
 */
export function setShouldFetchDeliveries(value){
    return {
        type: "SET_SHOULD_FETCH_DELIVERIES",
        payload: {
            value: value
        }
    };
}

/**
 * Sends request to the backend asking for deliveries
 */
export function requestDeliveries(parameters){
    return {
        type: "REQUEST_DELIVERIES",
        payload: {
            parameters: parameters
        }
    };
}

/**
 * Fetches deliveries from backend
 */
export function fetchDeliveries(parameters){
    return (dispatch) => {
        dispatch(requestDeliveries(parameters));
        return fetch(process.env.SERVICE_URL + "data/deliveries", {
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
            .then(json => dispatch(receiveDeliveries(json)));
    };
}

/**
 * Handles the result of fetchDeliveries
 */
export function receiveDeliveries(data){
    for(let i = 0; i < data.length; ++i){
        if(data[i].deliveryDate != null){
            data[i].deliveryDate = data[i].deliveryDate.split("T")[0];
        }
    }
    return {
        type: "RECEIVE_DELIVERIES",
        payload: {
            data: data
        }
    };
}


/**
 * Signals redux that request is being sent
 */
export function requestRegisterDelivery(data){
    return {
            type: "REQUEST_REGISTER_DELIVERY",
            payload: {
                data: data
            }
    };
}

/**
 * Sends request to backend to register delivery
 * @param data Data to be registred
 * @param updateDeliveriesParameters Parameters to send when updating delivery list
 */
export function registerDelivery(data, updateDeliveriesParameters){
    return (dispatch) => {
        dispatch(requestRegisterDelivery(data));
        return fetch(process.env.SERVICE_URL + "data/deliveries", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                action: "add"
            })
        })
            .then((response) => response.json())
            .then(json => {
                dispatch(receiveRegisterDeliveryResponse(json));
                dispatch(closePrompt());
                dispatch(fetchDeliveries(updateDeliveriesParameters));
            });
    }
}

/**
 * Handles response from server after adding products
 */
export function receiveRegisterDeliveryResponse(response){
    return {
        type: "RECEIVE_REGISTER_DELIVERY_RESPONSE",
        payload: {
            response: response
        }
    };
}
