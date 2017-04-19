import React from "react";
import {render} from "react-redux";


/**
 * Add product form
 */
export default class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productName: "",
            productPrice: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    render(){
        return (
            <div className="addProduct">

                <input
                    type="text"
                    name="productName"
                    value={this.state.productName}
                    onChange={this.handleChange}
                    placeholder="Produktnamn"
                />
                <input
                    type="text"
                    name="productPrice"
                    value={this.state.productPrice}
                    onChange={this.handleChange}
                    placeholder="Pris"
                />
                {this.getAddButton()}
            </div>
        );
    }


    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    getAddButton(){
        if(this.props.isAddingProduct){
            return (<div className="spinner">Lägger till...</div>);
        } else {
            return (
                <div
                    className="addProductButton"
                    onClick={() => {
                        this.props.addProduct({
                            productName: this.state.productName,
                            productPrice: this.state.productPrice},
                            this.props.updateProductsParameters
                        );
                    }}>Lägg till</div>
            );
        }
    }
}
