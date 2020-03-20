import { combineReducers } from 'redux';
import plusScoreReducer from './plusScoreReducer';
import isCorrectReducer from './isCorrectReducer';

const reducer = combineReducers({
    plusScore: plusScoreReducer,
    isCorrect: isCorrectReducer
});

export default reducer;