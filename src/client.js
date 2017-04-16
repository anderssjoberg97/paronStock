/*
 * Application entry point
 */

import {BrowserRouter, browserHistory} from "react-router-dom";
import React from "react";
import {render} from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";


import App from "./App";
import {combinedReducer} from "./combinedReducer";

//Grab state from server-generated html
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

//Create store from initial state

const store = createStore(combinedReducer, preloadedState);

window.onload = () => {
    render(
        (
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        ), document.getElementById("app")
    );
}
