import { combineReducers } from 'redux';

import userReducer from './userReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';
import restaurantReducer from './restaurantReducer';
import recipeReducer from './recipeReducer';
import homeChefReducer from './homeChefReducer';
import formsReducer from './formReducer';
import textReducer from './textReducer';

const appReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  alert: alertReducer,
  restaurant: restaurantReducer,
  recipes: recipeReducer,
  homeChef: homeChefReducer,
  forms: formsReducer,
  text: textReducer,
});

export default appReducer;
