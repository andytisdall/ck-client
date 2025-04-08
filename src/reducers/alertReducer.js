import { ALERT, CLEAR_MESSAGES, ERROR } from '../actions/types';

const INITIAL_STATE = {
  message: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALERT:
      return { message: action.payload };
    case CLEAR_MESSAGES:
      return INITIAL_STATE;
    case ERROR:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default alertReducer;
