const initalState = {
    display: false,
    title: null,
    content: null
};

/**
 * Handles product actions
 */
export default function promptReducer(state = initalState, action){
    switch(action.type){
        case "CLOSE_PROMPT": {
            return {
                ...state,
                display: false,
                title: null,
                content: null
            };
            break;
        }
        case "SHOW_PROMPT": {
            return {
                ...state,
                display: true,
                title: action.payload.title,
                content: action.payload.content
            };
            break;
        }
        default: {
            break;
        }
    }
    return state;
}
