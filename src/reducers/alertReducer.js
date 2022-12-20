import {
  MESSAGE_SENT,
  PHONE_ADDED,
  USER_CREATED,
  RESTAURANT_CREATED,
  CLEAR_MESSAGES,
  FILES_UPLOADED,
} from '../actions/types';

const INITIAL_STATE = {
  message: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_SENT:
      return { message: 'Message Sent!', data: action.payload };
    case PHONE_ADDED:
      return { message: 'Phone Number Added!' };
    case USER_CREATED:
      return { message: 'New User Created!' };
    case RESTAURANT_CREATED:
      return { message: 'New Restaurant Created!' };
    case FILES_UPLOADED:
      return {
        message: 'Files Successfully Uploaded!',
        data: action.payload.dataAdded,
      };
    case CLEAR_MESSAGES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default alertReducer;
