import {connect} from "react-redux";

import {registerDelivery} from "./../../actions/deliveriesActions";

import RegisterDelivery from "./RegisterDelivery";

const mapStateToProps = (store) => {
    return {
        isRegisteringDelivery: store.deliveries.isRegisteringDelivery,
        updateDeliveriesParameters: store.deliveries.parameters
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerDelivery: (data, updateDeliveriesParameters) => {
            dispatch(registerDelivery(data, updateDeliveriesParameters));
        }
    };
};

const RegisterDeliveryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterDelivery);

export default RegisterDeliveryContainer;
