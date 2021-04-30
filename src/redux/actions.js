import {
  CURRENT_USER, GET_CHAPTERS, GET_CHAPTER_ID, GET_VERSES,
} from './actionTypes';

const getCurrentUser = user => (
  {
    type: CURRENT_USER,
    payload: user,
  }
);

const getChapters = chapters => (
  {
    type: GET_CHAPTERS,
    payload: chapters,
  }
);

const getVerses = verses => (
  {
    type: GET_VERSES,
    payload: verses,
  }
);

const getChapterID = id => (
  {
    type: GET_CHAPTER_ID,
    id,
  }
);

export {
  getCurrentUser, getChapters, getVerses, getChapterID,
};
