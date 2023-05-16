import { GET_EVENT_SHIFTS } from '../actions/types';

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_SHIFTS:
      return action.payload;
    default:
      return state;
  }
};

export default eventReducer;
