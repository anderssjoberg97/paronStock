import React from "react";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/deliveries.scss");
}

import AppBarContainer from "./../common/components/appBar/AppBarContainer";
import SidebarContainer from "./../common/components/sidebar/SidebarContainer";

import RegisterDeliveryContainer from "./components/registerDelivery/RegisterDeliveryContainer";


/**
 * Main page for delivery listings
 */
export default class Deliveries extends React.Component{
    /**
     * Fetches the product data
     */
    componentDidMount(){
        if(this.props.shouldFetchDeliveries && !this.props.isFetching){
            this.props.fetchDeliveries({});
        }
    }

    render(){
        return (
            <div className="main deliveriesMain">
                <AppBarContainer />
                <div className="middleFrame deliveriesMiddleFrame">
                    <SidebarContainer />
                    <div className="rightFrame">
                        <div className="content deliveriesContent">

                            <h1>Leveranser</h1>
                            <div className="registerDeliveryButton" onClick={() => {this.props.showPrompt("Registrera leverans", <RegisterDeliveryContainer />)}}>
                                Registrera leverans +
                            </div>
                            <div className="deliveriesTableHeaders">
                                <div className="deliveryDate">
                                    <span>Datum</span>
                                </div>
                                <div className="productIdentifiers">
                                    <span>Namn (produkt-ID)</span>
                                </div>
                                <div className="warehouseLocation">
                                    <span>Lagerlokal</span>
                                </div>
                                <div className="deliveryQuantity">
                                    <span>Antal</span>
                                </div>
                            </div>
                            {this.getDeliveriesTable()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getDeliveriesTable(){
        if(this.props.isFetching || this.props.shouldFetchDeliveries){
            return (
                <div className="deliveriesTable">
                    <div className="spinner">Laddar</div>
                </div>
            );
        } else {
            return (<div className="deliveriesTable">
                {this.props.data.map((delivery) => {
                    return (<div key={"delivery" + delivery.deliveryId} className="delivery">
                        <div className="deliveryDate">
                            <span>{delivery.deliveryDate}</span>
                        </div>
                        <div className="productIdentifiers">
                            <span>{delivery.productName} ({delivery.productId})</span>
                        </div>
                        <div className="warehouseLocation">
                            <span>{delivery.warehouseLocation}</span>
                        </div>
                        <div className="deliveryQuantity">
                            <span>{delivery.deliveryQuantity < 0 ?  "" : "+" }{delivery.deliveryQuantity}</span>
                        </div>
                    </div>);
                })}
            </div>);
        }
    }
}
