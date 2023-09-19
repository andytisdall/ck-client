import server from './api';

import { router } from '../App';
import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = (username, password) => async (dispatch) => {
  const res = await server.post('/signin', {
    username,
    password,
  });
  localStorage.setItem('ck-token', res.data.token);
  dispatch({ type: SIGN_IN, payload: res.data.user });

  // prompt new user to change password
  if (!res.data.user.active) {
    router.navigate('user/change-password');
  }
};

export const googleSignIn = (credential) => async (dispatch) => {
  const res = await server.post('/google-signin', { credential });
  localStorage.setItem('ck-token', res.data.token);
  dispatch({ type: SIGN_IN, payload: res.data.user });
};

export const signOut = () => {
  localStorage.removeItem('ck-token');
  return { type: SIGN_OUT };
};

export const forgotPassword = (email) => async () => {
  await server.post('/forgot-password', {
    email,
  });
  router.navigate('forgot-password/success');
};
