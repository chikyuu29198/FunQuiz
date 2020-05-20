
let initalState = {
    doneLevel : 0,
    currentLevel: 1
}

const levelReducer = (state = initalState, action) => {
    if (action.type == 'SET_CURRENT_LEVEL') return {
        doneLevel: state.doneLevel,
        currentLevel: action.current_level
    };
    if (action.type == 'UPDATE_LEVEL') return {
        doneLevel: state.doneLevel,
        currentLevel: state.currentLevel + 1
    };
    if ( action.type == 'RESET_LEVEL' )
    return {
        doneLevel: 0,
        currentLevel: 1
    };
    if (action.type == 'LEVEL_UP') return {
        doneLevel: state.doneLevel + 1,
        currentLevel: state.currentLevel
    };
    if (action.type == 'SET_DONE_LEVEL') return {
        doneLevel: action.done_level,
        currentLevel: state.currentLevel
    };
    return state
};

export default levelReducer;