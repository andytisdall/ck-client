import _ from 'lodash'

import {
  CREATE_USER,
  GET_ALL_USERS,
  SIGN_IN,
  SIGN_OUT,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  users: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, user: action.payload };
    case SIGN_OUT:
      return INITIAL_STATE;
    case GET_ALL_USERS:
      return { ...state, users: _.mapKeys(action.payload, (i) => i.id) };
    case CREATE_USER:
      return { ...state, users: {...state.users, [action.payload.id]: action.payload} };
    default:
      return state;
  }
};

export default userReducer;
