import { CURRENT_USER, GET_CHAPTERS } from './actionTypes';

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

export { getCurrentUser, getChapters };
