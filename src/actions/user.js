import {
  SIGN_IN,
  SIGN_OUT,
  GET_ALL_USERS,
  CREATE_USER,
  EDIT_USER,
  GET_USER_INFO,
} from './types';
import server from './api';
import { setAlert } from './alert';

export const getUser = () => async (dispatch) => {
  const res = await server.get('/user');
  dispatch({ type: SIGN_IN, payload: res.data });
};

export const getUserInfo = () => async (dispatch) => {
  const res = await server.get('/user/userInfo');
  dispatch({ type: GET_USER_INFO, payload: res.data });
};

export const getAllUsers = () => async (dispatch) => {
  const res = await server.get('/user/all');
  dispatch({ type: GET_ALL_USERS, payload: res.data });
};

export const signIn = (username, password) => async (dispatch) => {
  const res = await server.post('/signin', {
    username,
    password,
  });
  dispatch({ type: SIGN_IN, payload: res.data.user });
  localStorage.setItem('ck-token', res.data.token);
};

export const signOut = () => {
  localStorage.removeItem('ck-token');
  return { type: SIGN_OUT };
};

export const createUser = (username, password) => async (dispatch) => {
  const res = await server.post('/user', {
    username,
    password,
  });
  dispatch({ type: CREATE_USER, payload: res.data });
  dispatch(setAlert('User Created'));
};

export const editUser = (userId, username, password) => async (dispatch) => {
  const res = await server.patch('/user', {
    userId,
    username,
    password,
  });
  dispatch({ type: EDIT_USER, payload: res.data });
  dispatch(setAlert('User Modified!'));
};
