import { combineReducers } from 'redux';
import plusScoreReducer from './plusScoreReducer';
import isCorrectReducer from './isCorrectReducer';
import { updateIndex } from '../actionCreators';
import updateIndexReducer from './updateIndexReducer';
import soundReducer from './soundReducer';

const reducer = combineReducers({
    plusScore: plusScoreReducer,
    isCorrect: isCorrectReducer,
    updateIndex: updateIndexReducer,
    soundStatus: soundReducer 
});

export default reducer;