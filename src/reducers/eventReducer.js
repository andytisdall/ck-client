import _ from 'lodash';

import {
  GET_EVENT_SHIFTS,
  SIGN_UP_FOR_EVENT_SHIFT,
  GET_EVENT_HOURS,
} from '../actions/types';

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT_SHIFTS:
      return {
        ...state,
        shifts: _.mapKeys(action.payload.shifts, (shift) => shift.id),
        jobs: action.payload.jobs,
      };
    case SIGN_UP_FOR_EVENT_SHIFT:
      const shift = state.shifts[action.payload.shift];
      shift.open = false;
      return {
        ...state,
        shifts: { ...state.shifts, [action.payload.shift]: shift },
        hours: { ...state.hours, [action.payload.id]: action.payload },
      };
    case GET_EVENT_HOURS:
      return { ...state, hours: _.mapKeys(action.payload, (hour) => hour.id) };
    default:
      return state;
  }
};

export default eventReducer;
