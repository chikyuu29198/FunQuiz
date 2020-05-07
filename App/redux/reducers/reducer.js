import { combineReducers } from 'redux';
import plusScoreReducer from './plusScoreReducer';
import isCorrectReducer from './isCorrectReducer';
import { updateIndex } from '../actionCreators';
import updateIndexReducer from './updateIndexReducer';
import soundReducer from './soundReducer';
import disableAnswerReducer from './disableAnswerReducer';
import getDataReducer from './getDataReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
    plusScore: plusScoreReducer,
    isCorrect: isCorrectReducer,
    updateIndex: updateIndexReducer,
    soundStatus: soundReducer,
    disableAnswer: disableAnswerReducer,
    quizData: getDataReducer,
    user: userReducer
});

export default reducer;