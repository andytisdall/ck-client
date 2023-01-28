import { ALERT } from '../actions/types';

const INITIAL_STATE = {
  message: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALERT:
      return { message: action.payload };
    default:
      return INITIAL_STATE;
  }
};

export default alertReducer;
