const winFlagReducer = (state = false, action) => {
    if (action.type == 'FLAG_WIN') return true;
    if (action.type == 'UNFLAGGED_WIN') return false;
    return state;
};

export default winFlagReducer;