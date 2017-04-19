import React from "react";
import PropTypes from "prop-types";
import {render} from "react-redux";

import fetch from "isomorphic-fetch";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/productSearchAutoComplete.scss");
}

/**
 * Autocompletes searches for products
 */
export default class ProductSearchAutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product: null,
            results: null,
            searchString: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.getResults = this.getResults.bind(this);
    }

    handleChange(event){
        const value = event.target.value;
        this.setState(
            {searchString:value},
            () => {
                if(value != ""){
                    this.search();
                } else {
                    this.setState({product: null, results: null});
                    this.props.onSelect(null);
                }
            });
    }

    search(){
        fetch(process.env.SERVICE_URL + "data/products", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "get",
                search: this.state.searchString,
                limit: 5
            })
        })
            .then((response) => response.json())
            .then(json => {
                this.setState({results: json});
            });
    }

    getResults(){
        if(this.state.results == null){
            return null;
        } else {
            return (<ul className="autoCompleteResults">
                {this.state.results.map((product) => {
                    return (<li
                        key={"productId" + product.productId}
                        className="autoCompleteResult"
                        onClick={() => {
                            this.setState({product: product, searchString: product.productName, results: null}, () => {
                                this.props.onSelect(product);
                            });

                        }}>
                        {product.productName}
                    </li>)
                })}
            </ul>)
        }
    }

    render(){
        return (
            <div className="productSearch">
                <input
                    type="text"
                    placeholder="Produkt"
                    value={this.state.searchString}
                    onChange={this.handleChange} />
                {this.getResults()}
            </div>
        );
    }

}

ProductSearchAutoComplete.propTypes = {
    onSelect: PropTypes.func.isRequired
};
