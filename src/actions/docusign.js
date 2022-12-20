import { GET_AUTH_URL } from './types';
import server from './api';
import { setError } from './error';

export const callDocusign = () => async (dispatch) => {
  try {
    const res = await server.post('/docusign/login');
    dispatch({ type: GET_AUTH_URL, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};
