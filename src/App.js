import React from "react";
import render from "react-dom";
import {Route} from "react-router-dom"

import HelloWorld from "./common/HelloWorld";
import HelloRouter from "./common/HelloRouter";

export default class App extends React.Component{
    render(){
        return (
            <div className="routes">
                <Route exact path="/" component={HelloWorld} />
                <Route path="/route/" component={HelloRouter} />
            </div>
        );
    }
}
//
