import { combineReducers } from 'redux';

import userReducer from './userReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';
import restaurantReducer from './restaurantReducer';

const appReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  alert: alertReducer,
  restaurant: restaurantReducer,
});

export default appReducer;
