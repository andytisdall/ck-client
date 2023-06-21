import _ from 'lodash';

import {
  FETCH_RESTAURANT,
  FETCH_ALL_RESTAURANTS,
  EDIT_RESTAURANT,
  FETCH_MEAL_PROGRAM_INFO,
} from '../actions/types';

const INITIAL_STATE = {
  restaurant: null,
  restaurants: {},
};

const restaurantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT:
      return {
        restaurants: {
          ...state.restaurants,
          [action.payload.id]: action.payload,
        },
        restaurant: action.payload,
      };
    case FETCH_MEAL_PROGRAM_INFO:
      return {
        ...state,
        restaurant: { ...state.restaurant, ...action.payload },
      };
    case FETCH_ALL_RESTAURANTS:
      return { ...state, restaurants: _.mapKeys(action.payload, (i) => i.id) };
    case EDIT_RESTAURANT:
      let restaurant = { ...state.restaurant };
      if (action.payload.id === state.restaurant?.id) {
        restaurant = action.payload;
      }
      return {
        ...state,
        restaurant,
        restaurants: {
          ...state.restaurants,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default restaurantReducer;
