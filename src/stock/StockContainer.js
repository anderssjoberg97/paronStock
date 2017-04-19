import {connect} from "react-redux";

import {fetchStock} from "./actions/stockActions";

import Stock from "./Stock";

const mapStateToProps = (store, ownProps) => {
    return {
        isFetching: store.stock.isFetching,
        data: store.stock.data,
        warehouses: store.stock.warehouses,
        parameters: {
            warehouseId: ownProps.match.params.warehouseId
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStock: (parameters) => {
            dispatch(fetchStock(parameters));
        }
    };
};

const StockContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Stock);

export default StockContainer;
