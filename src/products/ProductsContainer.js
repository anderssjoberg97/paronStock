import {connect} from "react-redux";

import {fetchProducts} from "./actions/productsActions";
import {showPrompt} from "./../common/components/prompt/actions/promptActions";

import Products from "./Products";

const mapStateToProps = (store) => {
    return {
        shouldFetchProducts: store.products.shouldFetchProducts,
        isFetching: store.products.isFetching,
        data: store.products.data,
        parameters: store.products.parameters
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: (parameters) => {
            dispatch(fetchProducts(parameters));
        },
        showPrompt: (title, content) => {
            dispatch(showPrompt(title, content));
        }
    };
};

const ProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);

export default ProductsContainer;
