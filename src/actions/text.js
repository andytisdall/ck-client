import { setAlert } from './alert';
import {
  SEND_TEXT,
  GET_FEEDBACK,
  EDIT_FEEDBACK,
  DELETE_FEEDBACK,
} from './types';
import server from './api';
import { router } from '../App';

export const addPhone = (phone, region) => async (dispatch) => {
  await server.post('/text/addphone', { phone, region });
  dispatch(setAlert('Phone Number Added'));
};

export const sendText = (message, region, photo) => async (dispatch) => {
  const postBody = new FormData();
  postBody.append('message', message);
  postBody.append('region', region);
  postBody.append('photo', photo);
  const res = await server.post('/text/outgoing', postBody, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  dispatch({ type: SEND_TEXT, payload: res.data });
  dispatch(setAlert('Message Sent'));
  router.navigate('/text/text-success');
};

export const sendCustomText = (message, to, photo) => async (dispatch) => {
  const postBody = new FormData();
  postBody.append('message', message);
  postBody.append('region', to);
  postBody.append('photo', photo);
  const res = await server.post('/text/outgoing', postBody, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  dispatch({ type: SEND_TEXT, payload: res.data });
  dispatch(setAlert('Message Sent'));
  router.navigate('/text/text-success');
};

export const getFeedback = () => async (dispatch) => {
  const res = await server.get('/text/feedback');
  dispatch({ type: GET_FEEDBACK, payload: res.data });
};

export const editFeedback = (id) => async (dispatch) => {
  const res = await server.patch(`/text/feedback/${id}`);
  dispatch({ type: EDIT_FEEDBACK, payload: res.data });
};

export const deleteFeedback = (id) => async (dispatch) => {
  const res = await server.delete(`/text/feedback/${id}`);
  dispatch({ type: DELETE_FEEDBACK, payload: res.data });
};
