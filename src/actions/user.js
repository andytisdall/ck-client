import {
  SIGN_IN,
  GET_ALL_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  GET_USER_INFO,
} from './types';
import server from './api';
import { setAlert } from './alert';
import { router } from '../App';
import { signOut } from './auth';

export const getSFUserInfo = () => async (dispatch) => {
  const res = await server.get('/user/sf-user-info');
  console.log(res.data);
};

export const getUser = () => async (dispatch) => {
  const res = await server.get('/user');
  if (res.data) {
    dispatch({ type: SIGN_IN, payload: res.data });
  } else dispatch(signOut);
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const res = await server.get('/user/userInfo');
    dispatch({ type: GET_USER_INFO, payload: res.data });
  } catch (err) {
    router.navigate('/404');
    throw Error(err);
  }
};

export const getAllUsers = () => async (dispatch) => {
  const res = await server.get('/user/all');
  dispatch({ type: GET_ALL_USERS, payload: res.data });
};

export const createUser =
  (username, password, salesforceId) => async (dispatch) => {
    const res = await server.post('/user', {
      username,
      password,
      salesforceId,
    });
    dispatch({ type: CREATE_USER, payload: res.data });
    dispatch(setAlert('User Created'));
    router.navigate('/admin');
  };

export const editUser =
  (userId, username, password, salesforceId) => async (dispatch) => {
    const res = await server.patch('/user', {
      userId,
      username,
      password,
      salesforceId,
    });
    dispatch({ type: EDIT_USER, payload: res.data });
    dispatch(setAlert('User Modified!'));
    router.navigate('/admin');
  };

export const deleteUser = (userId) => async (dispatch) => {
  await server.delete('/user/' + userId);
  dispatch({ type: DELETE_USER, payload: userId });
  dispatch(setAlert('User Deleted!'));
  router.navigate('/admin');
};
