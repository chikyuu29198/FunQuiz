const disableAnswertReducer = (state = false, action) => {
    if (action.type == 'ENABLE_ANSWER') return false;
    if (action.type == 'DISABLE_ANSWER') return true;
    return state;
};

export default disableAnswertReducer;