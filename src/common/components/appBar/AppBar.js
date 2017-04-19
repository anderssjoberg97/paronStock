import React from "react";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/appBar.scss");
}

export default class AppBar extends React.Component{
    render(){
        return (
            <div className="appBar">
                <div className="expandSidebarButton"
                    onClick={() => {
                        this.props.setSidebarExpanded(!this.props.expanded);
                    }}>
                    
                </div>
                <div className="appBarHeader">
                    Päron Inc. Lagersystem
                </div>
                <div className="appBarNotifications">
                </div>
            </div>
        );
    }
}
