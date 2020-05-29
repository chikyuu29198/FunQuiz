const gamePlayingReducer = (state = null, action) => {
    if (action.type == 'RUNAWAY') return 1;
    if (action.type == 'PUNCH_MOUSE') return 2;
    return state;
};

export default gamePlayingReducer;