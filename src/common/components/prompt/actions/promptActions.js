/**
 * Closes the prompt display
 */
export function closePrompt(){
    return {
        type: "CLOSE_PROMPT",
        payload: {
        }
    };
}

/**
 * Displays the window prompt
 */
export function showPrompt(title, content){
    return {
        type: "SHOW_PROMPT",
        payload: {
            title: title,
            content: content
        }
    }
}
