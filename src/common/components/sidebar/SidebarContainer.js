import {connect} from "react-redux";

import {fetchSidebarWarehouses, setSidebarExpanded} from "./actions/sidebarActions";

import Sidebar from "./Sidebar";

const mapStateToProps = (store) => {
    return {
        warehouses: store.sidebar.warehouses,
        expanded: store.sidebar.expanded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSidebarWarehouses: () => {
            dispatch(fetchSidebarWarehouses());
        },
        setSidebarExpanded: (value) => {
            dispatch(setSidebarExpanded(value));
        }
    };
};

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

export default SidebarContainer;
