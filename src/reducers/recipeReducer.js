import _ from 'lodash';

import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  EDIT_RECIPE,
} from '../actions/types';

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    case GET_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, (i) => i.id) };
    case CREATE_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_RECIPE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default recipeReducer;
