import _ from 'lodash';

import {
  SIGN_UP_FOR_EVENT_SHIFT,
  GET_EVENT_HOURS,
  GET_EVENTS,
} from '../actions/types';

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        shifts: _.mapKeys(
          action.payload.map((cam) => cam.shifts).flat(),
          (shift) => shift.id
        ),

        jobs: action.payload.map((cam) => cam.jobs).flat(),
        campaigns: action.payload.map((cam) => cam.campaign),
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
