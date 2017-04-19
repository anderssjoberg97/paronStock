import fetch from "isomorphic-fetch";

import {closePrompt} from "./../../common/components/prompt/actions/promptActions";


/**
 * Signals that product data should be fetched
 */
export function setShouldFetchProducts(value){
    return {
        type: "SET_SHOULD_FETCH_PRODUCTS",
        payload: {
            value: value
        }
    };
}

/**
 * Signals redux that we are fetching data from server
 */
export function requestProducts(parameters){
    return {
        type: "REQUEST_PRODUCTS",
        payload: {
            parameters: parameters
        }
    };
}

/**
 * Fetches product listings from server
 */
export function fetchProducts(parameters){
    return (dispatch) => {
        dispatch(requestProducts(parameters));
        return fetch(process.env.SERVICE_URL + "data/products", {
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
            .then(json => dispatch(receiveProducts(json)));
    };
}

/**
 * Handles the result of fetchProducts
 */
export function receiveProducts(data){
    return {
        type: "RECEIVE_PRODUCTS",
        payload: {
            data: data
        }
    };
}

/**
 * Signals redux that request is being sent
 */
export function requestAddProduct(data){
    return {
            type: "REQUEST_ADD_PRODUCT",
            payload: {
                data: data
            }
    };
}

/**
 * Sends request to backend to add product
 */
export function addProduct(data, updateProductsParameters){
    return (dispatch) => {
        dispatch(requestAddProduct(data));
        return fetch(process.env.SERVICE_URL + "data/products", {
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
                dispatch(receiveAddProductResponse(json));
                dispatch(closePrompt());
                dispatch(fetchProducts(updateProductsParameters));
            });
    }
}

/**
 * Handles response from server after adding products
 */
export function receiveAddProductResponse(response){
    return {
        type: "RECEIVE_ADD_PRODUCT_RESPONSE",
        payload: {
            response: response
        }
    };
}
