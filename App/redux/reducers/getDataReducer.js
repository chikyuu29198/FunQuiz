const getDataReducer = (state = [], action) => {
    if (action.type == 'GET_DATA') 
       return action.data
    if (action.type == 'RESET_DATA') return [];
    return state;
};

export default getDataReducer;