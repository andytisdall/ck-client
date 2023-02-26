import { ERROR, CLEAR_ERROR } from '../actions/types';

const INITIAL_STATE = {
  error: null,
  timeout: null,
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR:
      const { message, timeout } = action.payload;
      return { error: message, timeout };
    case CLEAR_ERROR:
      clearTimeout(state.timeout);
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};

export default errorReducer;
