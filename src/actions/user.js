import {
  SIGN_IN,
  SIGN_OUT,
  GET_ALL_USERS,
  CREATE_USER,
  USER_CREATED,
  CLEAR_MESSAGES,
} from './types';
import server from './api';
import { setError } from './error';

export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem('ck-token');
  if (token) {
    try {
      const res = await server.get('/user');
      dispatch({ type: SIGN_IN, payload: res.data });
    } catch (err) {
      dispatch(setError(err));
    }
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await server.get('/user/all');
    dispatch({ type: GET_ALL_USERS, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const signIn = (username, password) => async (dispatch) => {
  try {
    const res = await server.post('/signin', {
      username,
      password,
    });
    dispatch({ type: SIGN_IN, payload: res.data.user });
    localStorage.setItem('ck-token', res.data.token);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const signOut = () => {
  localStorage.removeItem('ck-token');
  return { type: SIGN_OUT };
};

export const createUser = (username, password) => async (dispatch) => {
  try {
    const res = await server.post('/user', {
      username,
      password,
    });
    dispatch({ type: CREATE_USER, payload: res.data });
    dispatch({ type: USER_CREATED });
    setTimeout(() => {
      dispatch({ type: CLEAR_MESSAGES });
    }, 10000);
  } catch (err) {
    dispatch(setError(err));
  }
};
