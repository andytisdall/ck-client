import { MESSAGE_SENT, ALERT } from '../actions/types';

const INITIAL_STATE = {
  message: null,
  data: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_SENT:
      return { message: 'Message Sent!', data: action.payload };
    case ALERT:
      return { message: action.payload };
    default:
      return INITIAL_STATE;
  }
};

export default alertReducer;
