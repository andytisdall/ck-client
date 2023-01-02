import {
  MESSAGE_SENT,
  CLEAR_MESSAGES,
  FILES_UPLOADED,
  ALERT,
} from '../actions/types';

const INITIAL_STATE = {
  message: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_SENT:
      return { message: 'Message Sent!', data: action.payload };
    case ALERT:
      return { message: action.payload };
    case FILES_UPLOADED:
      return {
        message: 'Files Successfully Uploaded!',
        data: action.payload.dataAdded,
      };
    case CLEAR_MESSAGES:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};

export default alertReducer;
