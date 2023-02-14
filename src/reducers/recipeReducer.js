import _ from 'lodash';

import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
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
    case DELETE_RECIPE:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default recipeReducer;
