import { GET_VERSES } from '../actionTypes';

const versesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_VERSES:
      return action.payload;
    default:
      return state;
  }
};

export default versesReducer;
