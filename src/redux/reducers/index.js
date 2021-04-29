import { combineReducers } from 'redux';
import chaptersReducer from './chapter';
import userReducer from './user';

const rootReducer = combineReducers({ user: userReducer, chapter: chaptersReducer });

export default rootReducer;
