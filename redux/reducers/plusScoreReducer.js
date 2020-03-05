const plusScoreReducer = (state = 0, action) => {
    if (action.type === 'PLUS_SCORE') return state + 1;
    return state;
};

export default plusScoreReducer;