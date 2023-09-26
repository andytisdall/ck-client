import { GET_VOLUNTEER, CREATE_VOLUNTEER } from '../actions/types';

const INITIAL_STATE = {
  volunteer: undefined,
};

const volunteerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VOLUNTEER:
      return { ...state, volunteer: action.payload || null };
    case CREATE_VOLUNTEER:
      return { ...state, volunteer: action.payload };
    default:
      return state;
  }
};

export default volunteerReducer;
