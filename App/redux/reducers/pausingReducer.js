const pausingReducer = (state = false, action) => {
    if (action.type == 'PAUSE') return true;
    if (action.type == 'UN_PAUSE') return false;
    return state;
};

export default pausingReducer;