import { GET_CHAPTER_ID } from '../actionTypes';

const chapterIDReducer = (state = ' ', action) => {
  switch (action.type) {
    case GET_CHAPTER_ID:
      return action.id;
    default:
      return state;
  }
};

export default chapterIDReducer;
