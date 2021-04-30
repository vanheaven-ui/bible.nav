import {
  CURRENT_USER, GET_BOOK_NAME, GET_CHAPTERS, GET_CHAPTER_ID, GET_CHAPTER_NUM, GET_VERSES,
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

const getBookName = name => (
  {
    type: GET_BOOK_NAME,
    name,
  }
);

const getChapterNum = num => (
  {
    type: GET_CHAPTER_NUM,
    num,
  }
);

export {
  getCurrentUser, getChapters, getVerses, getChapterID, getBookName, getChapterNum,
};
