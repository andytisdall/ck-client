import _ from 'lodash';

import { GET_FEEDBACK, EDIT_FEEDBACK, DELETE_FEEDBACK } from '../actions/types';

const INITIAL_STATE = {
  feedback: null,
};

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: { ..._.mapKeys(action.payload, (i) => i.id) },
      };
    case EDIT_FEEDBACK:
      return {
        ...state,
        feedback: { ...state.feedback, [action.payload.id]: action.payload },
      };
    case DELETE_FEEDBACK:
      const { feedback } = state;
      delete feedback[action.payload];
      return { ...state, feedback: { ...feedback } };
    default:
      return state;
  }
};

export default textReducer;
