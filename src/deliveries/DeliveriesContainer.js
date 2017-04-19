import {connect} from "react-redux";

import {fetchDeliveries} from "./actions/deliveriesActions";
import {showPrompt} from "./../common/components/prompt/actions/promptActions";
import Deliveries from "./Deliveries";

const mapStateToProps = (store) => {
    return {
        shouldFetchDeliveries: store.deliveries.shouldFetchDeliveries,
        isFetching: store.deliveries.isFetching,
        data: store.deliveries.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDeliveries: (parameters) => {
            dispatch(fetchDeliveries(parameters));
        },
        showPrompt: (title, content) => {
            dispatch(showPrompt(title, content));
        }
    };
};

const DeliveriesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Deliveries);

export default DeliveriesContainer;
