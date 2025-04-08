import { SUBMIT_FORM } from '../actions/types';

const formsReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return { successMessage: action.payload };
    default:
      return state;
  }
};

export default formsReducer;
