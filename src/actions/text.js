import { setError } from './error';
import { setAlert } from './alert';
import {
  CLEAR_MESSAGES,
  SEND_TEXT,
  ALERT,
  GET_FEEDBACK,
  EDIT_FEEDBACK,
  DELETE_FEEDBACK,
} from './types';
import server from './api';

export const addPhone = (phone, region) => async (dispatch) => {
  try {
    await server.post('/text/addphone', { phone, region });
    dispatch({ type: ALERT, payload: 'Phone Number Added' });
    setTimeout(() => {
      dispatch({ type: CLEAR_MESSAGES });
    }, 10000);
  } catch (err) {
    dispatch(setError(err));
  }
};

export const sendText = (message, region, photo) => async (dispatch) => {
  try {
    const postBody = new FormData();
    postBody.append('message', message);
    postBody.append('region', region);
    postBody.append('photo', photo);
    const res = await server.post('/text/outgoing', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: SEND_TEXT, payload: res.data });
    dispatch(setAlert('Message Sent'));
  } catch (err) {
    dispatch(setError(err));
  }
};

export const sendCustomText = (message, to, photo) => async (dispatch) => {
  try {
    const postBody = new FormData();
    postBody.append('message', message);
    postBody.append('region', to);
    postBody.append('photo', photo);
    const res = await server.post('/text/outgoing', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: SEND_TEXT, payload: res.data });
    dispatch(setAlert('Message Sent'));
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
