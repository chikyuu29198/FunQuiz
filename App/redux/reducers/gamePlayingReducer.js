
let initalState = {
    gameName : null,
    quizKey: null
}
const gamePlayingReducer = (state = initalState, action) => {
    if (action.type == 'RUNAWAY') 
    return {
        gameName: 1,
        quizKey: state.quizKey
      };
      if (action.type == 'PUNCH_MOUSE') 
      return {
          gameName: 2,
          quizKey: state.quizKey
        };
    if (action.type == 'SET_KEY') 
    return {
        gameName: state.gameName,
        quizKey: action.key
        };
    if (action.type == 'RESET_KEY') 
    return {
        gameName: state.gameName,
        quizKey: null
        };
    return state;
};

export default gamePlayingReducer;