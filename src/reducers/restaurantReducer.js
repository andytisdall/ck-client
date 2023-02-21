import _ from 'lodash';

import {
  FETCH_RESTAURANT,
  FETCH_ALL_RESTAURANTS,
  EDIT_RESTAURANT,
  UPLOAD_FILES,
} from '../actions/types';

const INITIAL_STATE = {
  restaurant: null,
  restaurants: {},
};

const restaurantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT:
      const combinedRestaurant = {
        ...action.payload.restaurant,
        ...action.payload.extraInfo,
      };
      return {
        restaurants: {
          ...state.restaurants,
          [combinedRestaurant.id]: combinedRestaurant,
        },
        restaurant: combinedRestaurant,
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
    case UPLOAD_FILES:
      if (action.payload.accountType !== 'restaurant') {
        return state;
      }
      const files = action.payload.filesAdded;
      const newRest = { ...state.restaurant };
      newRest.remainingDocs = newRest.remainingDocs.filter(
        (f) => !files.includes(f)
      );
      files.forEach((f) => {
        if (!newRest.completedDocs.includes(f)) {
          newRest.completedDocs.push(f);
        }
      });
      return {
        restaurants: { ...state.restaurants, [newRest.id]: newRest },
        restaurant: newRest,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
