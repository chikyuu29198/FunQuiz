let initalState = {
    listQuiz : [],
    totalLevel: 0
}

const getDataReducer = (state = initalState, action) => {
    if (action.type == 'GET_DATA') 
    return {
        listQuiz: action.listQuiz,
        totalLevel: action.totalLevel
      };
    if (action.type == 'RESET_DATA') return {
        listQuiz : [],
        totalLevel: 0
    };
    return state;
};

export default getDataReducer;