import { FETCH_RESTAURANT } from '../actions/types';

const restaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT:
      return action.payload;
    default:
      return state;
  }
};

export default restaurantReducer;
