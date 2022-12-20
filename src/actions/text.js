import { setError } from './error';
import { CLEAR_MESSAGES, MESSAGE_SENT, PHONE_ADDED } from './types';
import server from './api';

export const addPhone = (phone) => async (dispatch) => {
  try {
    await server.post('/addphone', { phone });
    dispatch({ type: PHONE_ADDED });
    setTimeout(() => {
      dispatch({ type: CLEAR_MESSAGES });
    }, 10000);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const sendText = (message) => async (dispatch) => {
  try {
    const res = await server.post('/sms', { message });
    dispatch({ type: MESSAGE_SENT, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};
