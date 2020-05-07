const updateLevelReducer = (state = 0, action) => {
    if (action.type === 'UPDATE_LEVEL') return state + 1;
    if ( action.type === 'RESET_LEVEL' ) return 0;
    return state;
};

export default updateLevelReducer;