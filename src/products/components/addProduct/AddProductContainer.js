import {connect} from "react-redux";

import {addProduct} from "./../../actions/productsActions";

import AddProduct from "./AddProduct";

const mapStateToProps = (store) => {
    return {
        isAddingProduct: store.products.isAddingProduct,
        updateProductsParameters: store.products.parameters
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (data, updateProductsParameters) => {
            dispatch(addProduct(data, updateProductsParameters));
        }
    };
};

const AddProductContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProduct);

export default AddProductContainer;
