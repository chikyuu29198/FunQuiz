const isCorrectReducer = (state = null, action) => {
    if (action.type === 'HANDLE_CORECT') return true;
    if (action.type == 'HANDLE_INCORRECT') return false;
    return state;
};

export default isCorrectReducer;