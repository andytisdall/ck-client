import { ERROR } from '../actions/types';

const INITIAL_STATE = {
  error: null,
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR:
      return { error: action.payload };
    default:
      return state;
  }
};

export default errorReducer;
