import React from "react";
import {render} from "react-redux";



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
                    <div className="content productsContent">
                        Products
                        <div onClick={() => {this.props.showPrompt("Lägg till produkt", <AddProductContainer />)}}>
                            Lägg till produkt +
                        </div>
                        {this.getProductTable()}
                    </div>
                </div>
            </div>
        );
    }

    getProductTable(){
        if(this.props.isFetching || this.props.shouldFetchProducts){
            return (
                <div className="productTable">
                    <div className="spinner">Laddar</div>
                </div>
            );
        } else {
            return (<div className="productTable">
                {this.props.data.map((product) => {
                    return (<div key={"product" + product.productId} className="product">
                        <div className="productIdentifiers">
                            <span className="productName">{product.productName}</span>
                            <span className="productId">({product.productId})</span>
                        </div>
                        <div className="productPrice">{product.productPrice}</div>
                    </div>);
                })}
            </div>);
        }
    }
}
