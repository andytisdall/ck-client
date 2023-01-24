import { setError } from './error';
import {
  CLEAR_MESSAGES,
  MESSAGE_SENT,
  ALERT,
  GET_FEEDBACK,
  EDIT_FEEDBACK,
  DELETE_FEEDBACK,
} from './types';
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

export const getFeedback = () => async (dispatch) => {
  try {
    const res = await server.get('/text/feedback');
    dispatch({ type: GET_FEEDBACK, payload: res.data });
  } catch (err) {
    setError(err);
  }
};

export const editFeedback = (id) => async (dispatch) => {
  try {
    const res = await server.patch(`/text/feedback/${id}`);
    dispatch({ type: EDIT_FEEDBACK, payload: res.data });
  } catch (err) {
    setError(err);
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    const res = await server.delete(`/text/feedback/${id}`);
    dispatch({ type: DELETE_FEEDBACK, payload: res.data });
  } catch (err) {
    setError(err);
  }
};
