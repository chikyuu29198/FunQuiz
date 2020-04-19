const updateIndexReducer = (state = 0, action) => {
    if (action.type === 'UPDATE_INDEX') return state + 1;
    if ( action.type === 'RESET_INDEX' ) return 0;
    return state;
};

export default updateIndexReducer;