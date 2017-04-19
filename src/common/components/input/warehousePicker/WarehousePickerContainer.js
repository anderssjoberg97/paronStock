import {connect} from "react-redux";

import {fetchWarehouses} from "./../../../actions/commonActions";

import WarehousePicker from "./WarehousePicker";

const mapStateToProps = (store, ownProps) => {
    return {
        shouldFetchWarehouses: store.common.warehouses.shouldFetchWarehouses,
        isFetching: store.common.warehouses.isFetching,
        warehouses: store.common.warehouses.data,
        onSelect: ownProps.onSelect
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWarehouses: () => {
            dispatch(fetchWarehouses());
        }
    };
};

const WarehousePickerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WarehousePicker);

export default WarehousePickerContainer;
