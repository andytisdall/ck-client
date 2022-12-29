import _ from 'lodash';

import { FETCH_RESTAURANT, FETCH_ALL_RESTAURANTS } from '../actions/types';

const INITIAL_STATE = {
  restaurant: null,
  restaurants: {},
};

const restaurantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT:
      return { restaurants: {...state.restaurants, [action.payload.id]: action.payload}, restaurant: action.payload };
    case FETCH_ALL_RESTAURANTS:
      return { ...state, restaurants: _.mapKeys(action.payload, (i) => i.id) }
    default:
      return state;
  }
};

export default restaurantReducer;
