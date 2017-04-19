import React from "react";
import {render} from "react-redux";
import {Link} from "react-router-dom";
import classnames from "classnames";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/sidebar.scss");
}

const SCREEN_SIZE_LIMIT = 960;

export default class Sidebar extends React.Component{
    /**
     * Fetches warehouse data
     */
    constructor(props){
        super(props);
        if(this.props.warehouses.data == null){
            this.props.fetchSidebarWarehouses();
        }

        this.closeIfSmallScreen = this.closeIfSmallScreen.bind(this);
    }

    componentDidMount(){

        if(process.env.BUILD_TARGET == "browser" && window.innerWidth >= SCREEN_SIZE_LIMIT){
            this.props.setSidebarExpanded(true);
        }
    }

    render(){
        return (
            <div className={classnames("sidebar", this.props.expanded ? "sidebarExpanded" : "")}>
                <ul>
                    <li><Link to="/" onClick={this.closeIfSmallScreen}  >Hem</Link></li>
                    <li>
                        <Link to="/stock/" onClick={this.closeIfSmallScreen}  >Lager</Link>
                        {this.getWarehouses()}
                    </li>
                    <li><Link to="/deliveries/" onClick={this.closeIfSmallScreen}>Leveranser</Link></li>
                    <li><Link to="/products/" onClick={this.closeIfSmallScreen} >Produkter</Link></li>
                </ul>
            </div>
        );
    }

    getWarehouses(){
        if(this.props.warehouses.isFetching){
            return (
                <div className="spinner">
                    Loading
                </div>
            );
        } else {
            return (
                <ul>
                    {this.props.warehouses.data.map((warehouse) => {
                        return (
                            <li key={"sidebarWarehouse" + warehouse.warehouseId}>
                                <Link to={"/stock/" + warehouse.warehouseId} onClick={this.closeIfSmallScreen} >
                                    {warehouse.warehouseLocation}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )
        }
    }

    closeIfSmallScreen(){
        console.log("hoho");
        if(process.env.BUILD_TARGET == "browser" && window.innerWidth < SCREEN_SIZE_LIMIT){
            console.log("haha");
            this.props.setSidebarExpanded(false);
        }
    }
}
