import {connect} from "react-redux";

import {closePrompt} from "./actions/promptActions";

import Prompt from "./Prompt";

const mapStateToProps = (store) => {
    return {
        display: store.prompt.display,
        title: store.prompt.title,
        content: store.prompt.content
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closePrompt: () => {
            dispatch(closePrompt());
        }
    };
};

const PromptContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Prompt);

export default PromptContainer;
