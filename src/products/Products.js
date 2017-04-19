import React from "react";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/productsStyles.scss");
}

import AppBarContainer from "./../common/components/appBar/AppBarContainer";
import SidebarContainer from "./../common/components/sidebar/SidebarContainer";

import AddProductContainer from "./components/addProduct/AddProductContainer";


/**
 * Main page for product listings
 */
export default class Products extends React.Component{

    /**
     * Fetches the product data
     */
    componentDidMount(props){
        if(this.props.shouldFetchProducts && !this.props.isFetching){
            this.props.fetchProducts(this.props.parameters);
        }
    }

    render(){
        return (
            <div className="main productsMain">
                <AppBarContainer />

                <div className="middleFrame productsMiddleFrame">
                    <SidebarContainer />
                    <div className="rightFrame">
                        <div className="content productsContent">
                            <h1>Produkter</h1>
                            <div className="addProductButton" onClick={() => {this.props.showPrompt("Lägg till produkt", <AddProductContainer />)}}>
                                Lägg till produkt +
                            </div>
                            <div className="productsTableHeaders">
                                <div className="productIdentifiers">
                                    <span>Namn (produkt-ID)</span>
                                </div>
                                <div className="productPrice">
                                    <span>Pris</span>
                                </div>
                            </div>

                            {this.getProductTable()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getProductTable(){
        if(this.props.isFetching || this.props.shouldFetchProducts){
            return (
                <div className="productsTable">
                    <div className="spinner">Laddar</div>
                </div>
            );
        } else {
            return (<div className="productsTable">
                {this.props.data.map((product) => {
                    return (<div key={"product" + product.productId} className="product">
                        <div className="productIdentifiers">
                            <span>{product.productName} ({product.productId})</span>
                        </div>
                        <div className="productPrice">{product.productPrice}</div>
                    </div>);
                })}
            </div>);
        }
    }
}
