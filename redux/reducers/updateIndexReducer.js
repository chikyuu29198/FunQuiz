const updateIndexReducer = (state = 0, action) => {
    if (action.type === 'UPDATE_INDEX') return state + 1;
    return state;
};

export default updateIndexReducer;