import _ from 'lodash';

import {
  GET_VOLUNTEER,
  CREATE_VOLUNTEER,
  GET_VOLUNTEER_HOURS,
  GET_VOLUNTEER_JOBS,
  SIGN_UP_FOR_VOLUNTEER_SHIFT,
} from '../actions/types';

const INITIAL_STATE = {
  volunteer: undefined,
};

const volunteerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VOLUNTEER:
      return { ...state, volunteer: action.payload || null };
    case CREATE_VOLUNTEER:
      return { ...state, volunteer: action.payload };
    case GET_VOLUNTEER_HOURS:
      return { ...state, hours: action.payload };
    case GET_VOLUNTEER_JOBS:
      return {
        ...state,
        shifts: _.mapKeys(action.payload.shifts, (shift) => shift.id),
        jobs: _.mapKeys(action.payload.jobs, (job) => job.id),
      };
    case SIGN_UP_FOR_VOLUNTEER_SHIFT:
      return {
        ...state,
        hours: { ...state.hours, [action.payload.id]: action.payload },
      };
    default:
      return state;
  }
};

export default volunteerReducer;
