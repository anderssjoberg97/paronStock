import React from "react";
import PropTypes from "prop-types";
import {render} from "react-redux";
import classnames from "classnames";

import fetch from "isomorphic-fetch";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/deliveryAmount.scss");
}

/**
 * Input for deliveryamounts
 */
export default class DeliveryAmount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            amountText: "",
            out: false,
            amount: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const value = event.target.value;
        let numberValue = parseInt(value);
        this.setState({amount: numberValue, amountText: numberValue}, () => {
            this.props.onChange(this.state.amount, this.state.out);
        });

    }

    render(){
        return (
            <div className="deliveryAmount">
                <div>
                    <input
                        type="text"
                        value={this.state.amountText}
                        onChange={this.handleChange} />
                </div>
                <div className={classnames("inOutDeliveryToggle", this.state.out ? "" : "active")}
                    onClick={() => this.setState({out: false}, () => {
                        this.props.onChange(this.state.amount, this.state.out);
                    })}>
                    In
                </div>
                <div className={classnames("inOutDeliveryToggle", this.state.out ? "active" : "")}
                    onClick={() => this.setState({out: true}, () => {
                        this.props.onChange(this.state.amount, this.state.out);
                    })}>
                    Ut
                </div>
            </div>
        );
    }

}

DeliveryAmount.propType = {
    onChange: PropTypes.func.isRequired
};
