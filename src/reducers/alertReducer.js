import { MESSAGE_SENT, CLEAR_MESSAGES, ALERT } from '../actions/types';

const INITIAL_STATE = {
  message: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_SENT:
      return { message: 'Message Sent!', data: action.payload };
    case ALERT:
      return { message: action.payload };
    case CLEAR_MESSAGES:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};

export default alertReducer;
