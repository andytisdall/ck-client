import { setError } from './error';
import { CLEAR_MESSAGES, MESSAGE_SENT, ALERT } from './types';
import server from './api';

export const addPhone = (phone, region) => async (dispatch) => {
  try {
    await server.post('/addphone', { phone, region });
    dispatch({ type: ALERT, payload: 'Phone Number Added' });
    setTimeout(() => {
      dispatch({ type: CLEAR_MESSAGES });
    }, 10000);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const sendText = (message, region) => async (dispatch) => {
  try {
    const res = await server.post('/text/outgoing', { message, region });
    dispatch({ type: MESSAGE_SENT, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};
