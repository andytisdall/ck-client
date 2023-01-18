import { combineReducers } from 'redux';

import userReducer from './userReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';
import restaurantReducer from './restaurantReducer';
import recipeReducer from './recipeReducer';
import homeChefReducer from './homeChefReducer';

const appReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  alert: alertReducer,
  restaurant: restaurantReducer,
  recipes: recipeReducer,
  homeChef: homeChefReducer,
});

export default appReducer;
