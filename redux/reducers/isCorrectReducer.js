const isCorrectReducer = (state = false, action) => {
    if (action.type == 'HANDLE_CORRECT') return true;
    if (action.type == 'HANDLE_INCORRECT') return false;
    if (action.type == 'RESET') return null;
    return state;
};

export default isCorrectReducer;