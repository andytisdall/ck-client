import _ from 'lodash';

import { GET_SHIFTS, SIGN_UP_FOR_SHIFT } from '../actions/types';

const INITIAL_STATE = {
  jobs: null,
  shifts: null,
};

const homeChefReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHIFTS:
      return {
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
    default:
      return state;
  }
};

export default homeChefReducer;
