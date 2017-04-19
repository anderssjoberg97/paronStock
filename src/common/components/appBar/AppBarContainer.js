import {connect} from "react-redux";

import {setSidebarExpanded} from "./../sidebar/actions/sidebarActions";

import AppBar from "./AppBar";

const mapStateToProps = (store) => {
    return {
        expanded: store.sidebar.expanded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarExpanded: (value) => {
            dispatch(setSidebarExpanded(value));
        }
    };
};

const AppBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBar);

export default AppBarContainer;
