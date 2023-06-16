import _ from 'lodash';

import { GET_MEAL_PROGRAM_SCHEDULE } from '../actions/types';

const INITIAL_STATE = {
  schedule: null,
  accounts: null,
};

const mealProgramReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEAL_PROGRAM_SCHEDULE:
      return {
        ...state,
        schedule: action.payload.deliveries,
        accounts: _.mapKeys(action.payload.accounts, 'Id'),
      };
    default:
      return state;
  }
};

export default mealProgramReducer;
