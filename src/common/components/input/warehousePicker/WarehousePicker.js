import React from "react";
import PropTypes from "prop-types";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/warehousePicker.scss");
}

/**
 * A dropdown list of warehouses to pick from
 */
export default class WarehousePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            warehouse: null
        };

    }

    componentDidMount(){
        if(this.props.shouldFetchWarehouses && !this.props.isFetching){
            this.props.fetchWarehouses();
        }
    }

    render(){
        return (
            <div className="warehousePicker">
                <div className="currentlySelected"
                    onClick={() => {
                        this.setState({isOpen: !this.state.isOpen});
                    }}>
                    {this.state.warehouse != null ? this.state.warehouse.warehouseLocation : "Lager"}
                </div>
                {this.state.isOpen ?
                    (<div className="warehouseDropDown">
                        {this.getWarehouseList()}
                    </div>) :
                    null
                }
            </div>
        );
    }

    getWarehouseList(){
        if(this.props.isFetching || this.props.shouldFetchWarehouses){
            return (<div className="Spinner">Laddar lager...</div>);
        } else {
            return (<ul>{this.props.warehouses.map((warehouse) => {
                return (
                    <li
                        onClick={() => {
                            this.setState({warehouse: warehouse, isOpen: false}, () => {
                                this.props.onSelect(warehouse);
                            });

                        }}>
                        {warehouse.warehouseLocation}
                    </li>);
            })}</ul>);
        }
    }

}

WarehousePicker.propTypes = {
    onSelect: PropTypes.func.isRequired
};
