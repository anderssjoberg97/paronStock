import React from "react";
import {render} from "react-redux";



import AppBarContainer from "./../common/components/appBar/AppBarContainer";
import SidebarContainer from "./../common/components/sidebar/SidebarContainer";

export default class Dashboard extends React.Component{
    render(){
        return (
            <div className="main dashboardMain">
                <AppBarContainer />
                <div className="middleFrame dashboardMiddleFrame">
                    <SidebarContainer />
                    <div className="content dashboardContent">
                        Dashboard
                    </div>
                </div>
            </div>
        );
    }
}
