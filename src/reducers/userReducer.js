import _ from 'lodash';

import {
  CREATE_USER,
  GET_ALL_USERS,
  SIGN_IN,
  SIGN_OUT,
  EDIT_USER,
  GET_USER_INFO,
  UPLOAD_FILES,
} from '../actions/types';

const INITIAL_STATE = {
  user: undefined,
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
      return {
        ...state,
        users: { ...state.users, [action.payload.id]: action.payload },
      };
    case EDIT_USER:
      let user = state.user;
      if (action.payload.id === state.user.id) {
        user = action.payload;
      }
      return {
        ...state,
        user,
        users: { ...state.users, [action.payload.id]: action.payload },
      };
    case GET_USER_INFO:
      if (!state.user) {
        return state;
      }
      return { ...state, user: { ...state.user, ...action.payload } };
    case UPLOAD_FILES:
      const { filesAdded } = action.payload;
      const newUser = { ...state.user };
      if (filesAdded.includes('Food Handler Certification')) {
        newUser.foodHandler = true;
      }
      if (filesAdded.includes('Volunteer Agreement')) {
        newUser.volunteerAgreement = true;
      }
      if (newUser.volunteerAgreement && newUser.foodHandler) {
        newUser.homeChefStatus = 'Active';
      }
      return { ...state, user: newUser };
    default:
      return state;
  }
};

export default userReducer;
