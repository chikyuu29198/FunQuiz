const soundReducer = (state = true, action) => {
    if (action.type === 'UPDATE_SOUND') return !state;
    return state;
};

export default soundReducer;