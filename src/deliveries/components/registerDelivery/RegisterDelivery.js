import React from "react";
import {render} from "react-redux";

import DatePicker from "./../../../common/components/input/datePicker/DatePicker.js";
import WarehousePickerContainer from "./../../../common/components/input/warehousePicker/WarehousePickerContainer";
import ProductSearchAutoComplete from "./../../../common/components/input/productSearchAutoComplete/ProductSearchAutoComplete";
import DeliveryAmount from "./../../../common/components/input/deliveryAmount/DeliveryAmount";


/**
 * Add product form
 */
export default class RegisterDelivery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: null,
            warehouse: null,
            product: null,
            amount: null,
            out: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.getRegisterButton = this.getRegisterButton.bind(this);
    }

    render(){
        return (
            <div className="addProduct">

                <DatePicker onSelect={(date) => {this.setState({date: date})}} />
                <WarehousePickerContainer onSelect={(warehouse) => {this.setState({warehouse: warehouse})}} />
                <ProductSearchAutoComplete onSelect={(product) => {this.setState({product: product})}} />
                <DeliveryAmount onChange={(amount, out) => {this.setState({amount: amount, out: out})}} />
                {this.getRegisterButton()}
            </div>
        );
    }


    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    getRegisterButton(){
        if(this.props.isRegisteringDelivery){
            return (<div className="spinner">Registrerar leverans...</div>);
        } else {
            return (
                <div
                    className="registerDeliveryButton"
                    onClick={() => {
                        console.log("STATE", this.state);
                        if(this.state.product != null &&
                            this.state.warehouse != null &&
                            this.state.date != null &&
                            this.state.amount != null
                        ){
                            this.props.registerDelivery(
                                {
                                    productId: this.state.product.productId,
                                    warehouseId: this.state.warehouse.warehouseId,
                                    date: this.state.date.getFullYear() + "-" +
                                        (this.state.date.getMonth() + 1) + "-" +
                                        this.state.date.getDate(),
                                    amount: this.state.out ? - this.state.amount : this.state.amount
                                },
                                this.props.updateProductsParameters
                            );
                        }
                    }}>Registrera</div>
            );
        }
    }
}
