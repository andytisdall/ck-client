import _ from 'lodash';

import { GET_SHIFTS } from '../actions/types';

const INITIAL_STATE = {
  jobs: [],
  shifts: {},
};

const homeChefReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHIFTS:
      return {
        jobs: action.payload.jobs,
        shifts: _.mapKeys(action.payload.shifts, (i) => i.id),
      };
    default:
      return state;
  }
};

export default homeChefReducer;
