import { combineReducers } from 'redux';
import chaptersReducer from './chapter';
import chapterIDReducer from './chapterID';
import userReducer from './user';
import versesReducer from './verses';

const rootReducer = combineReducers({
  user: userReducer,
  chapter: chaptersReducer,
  verses: versesReducer,
  chapterId: chapterIDReducer,
});

export default rootReducer;
