import React from "react";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/stock.scss");
}

import AppBarContainer from "./../common/components/appBar/AppBarContainer";
import SidebarContainer from "./../common/components/sidebar/SidebarContainer";


/**
 * Main page for product listings
 */
export default class Stock extends React.Component{
    /**
     * Fetches the product data
     */
    componentDidMount(){
        this.props.fetchStock(this.props.parameters);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.parameters.warehouseId !== nextProps.parameters.warehouseId){
            this.props.fetchStock(nextProps.parameters);
        }
    }

    render(){
        return (
            <div className="main stockMain">
                <AppBarContainer />
                <div className="middleFrame stockMiddleFrame">
                    <SidebarContainer />
                    <div className="rightFrame">
                        <div className="content stockContent">
                            <h1>Lager - {this.getStockName()}</h1>
                            <div className="stockTableHeaders">
                                <div className="productIdentifiers">
                                    <span>Namn (produkt-ID)</span>
                                </div>
                                <div className="productPrice">
                                    <span>Pris</span>
                                </div>
                                <div className="stock">
                                    <span>I lager</span>
                                </div>
                            </div>
                            {this.getStockTable()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getStockTable(){
        if(this.props.isFetching){
            return (
                <div className="stockTable">
                    <div className="spinner">Laddar</div>
                </div>
            );
        } else {
            return (<div className="stockTable">
                {this.props.data.map((stockEntry) => {
                    return (<div key={"stockEntry" + stockEntry.productId} className="stockEntry">
                        <div className="productIdentifiers">
                            <span>{stockEntry.productName} ({stockEntry.productId})</span>
                        </div>
                        <div className="productPrice">
                            <span>{stockEntry.productPrice}</span>
                        </div>
                        <div className="stock">
                            <span className="stock">
                                {this.props.parameters.warehouseId ? stockEntry["warehouse" + this.props.parameters.warehouseId + "Stock"] : stockEntry.stock}
                            </span>
                            <ul className="warehouseStock">
                                {this.props.warehouses.map((warehouse) => {
                                    return (
                                        <li key={"warehouseId" + warehouse.warehouseId}>{warehouse.warehouseLocation} - {stockEntry["warehouse" + warehouse.warehouseId + "Stock"]}</li>
                                    )
                                })}
                                <span>Totalt - {stockEntry.stock}</span>
                            </ul>
                        </div>
                    </div>);
                })}
            </div>);
        }
    }

    getStockName(){
        if(typeof this.props.parameters.warehouseId !== "undefined" && this.props.parameters.warehouseId){
            if(this.props.isFetching){
                return "";
            } else {
                //Look for name in warehouses prop
                for(let i = 0; i < this.props.warehouses.length; ++i){
                    if(this.props.warehouses[i].warehouseId == this.props.parameters.warehouseId){
                        return this.props.warehouses[i].warehouseLocation;
                    }
                }
            }
        } else {
            return "Globalt";
        }
    }
}
