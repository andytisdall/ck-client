import _ from 'lodash';

import { GET_SHIFTS, SIGN_UP_FOR_SHIFT, GET_HOURS } from '../actions/types';

const INITIAL_STATE = {
  jobs: null,
  shifts: null,
  hours: null,
};

const homeChefReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHIFTS:
      return {
        ...state,
        jobs: action.payload.jobs,
        shifts: _.mapKeys(action.payload.shifts, (i) => i.id),
      };
    case SIGN_UP_FOR_SHIFT:
      const shift = state.shifts[action.payload];
      shift.open = false;
      return {
        ...state,
        shifts: { ...state.shifts, [action.payload]: shift },
      };
    case GET_HOURS:
      return { ...state, hours: _.mapKeys(action.payload, (i) => i.id) };
    default:
      return state;
  }
};

export default homeChefReducer;
