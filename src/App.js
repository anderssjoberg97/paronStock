import React from "react";
import render from "react-dom";
import {Route} from "react-router-dom"

if(process.env.BUILD_TARGET == "browser"){
    require("./common/styles/base/base.scss");
}

import PromptContainer from "./common/components/prompt/PromptContainer";
import DashboardContainer from "./dashboard/DashboardContainer";
import StockContainer from "./stock/StockContainer";
import ProductsContainer from "./products/ProductsContainer";
import DeliveriesContainer from "./deliveries/DeliveriesContainer";

export default class App extends React.Component{
    render(){
        return (
            <div className="routes">
                <PromptContainer />
                <Route exact path="/" component={DashboardContainer} />
                <Route exact path="/stock/" component={StockContainer} />
                <Route path="/stock/:warehouseId" component={StockContainer} />
                <Route path="/products/" component={ProductsContainer} />
                <Route path="/deliveries/" component={DeliveriesContainer} />
            </div>
        );
    }
}
//
