import _ from 'lodash';

import {
  GET_VOLUNTEER,
  CREATE_VOLUNTEER,
  GET_VOLUNTEER_HOURS,
  GET_VOLUNTEER_JOBS,
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
    default:
      return state;
  }
};

export default volunteerReducer;
