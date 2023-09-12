import { setAlert } from './alert';
import {
  SEND_TEXT,
  GET_PHONE_NUMBER,
  GET_FEEDBACK,
  EDIT_FEEDBACK,
  DELETE_FEEDBACK,
  CLEAR_NUMBER,
  GET_TEXT_RECORDS,
  GET_RECURRING_TEXTS,
  DELETE_TEXT,
} from './types';
import server from './api';
import { router } from '../App';

export const addPhone = (phone, region) => async (dispatch) => {
  await server.post('/text/phone', { phone, region });
  dispatch(setAlert('Phone Number Added'));
};

export const getPhoneNumber = (number) => async (dispatch) => {
  const { data } = await server.get('/text/phone/' + number);
  dispatch({ type: GET_PHONE_NUMBER, payload: data });
};

export const deletePhone = (number) => async (dispatch) => {
  await server.delete('/text/phone/' + number);
  dispatch(clearNumber());
  dispatch(setAlert('Phone Number Deleted'));
};

export const clearNumber = () => {
  return { type: CLEAR_NUMBER };
};

export const sendScheduledText =
  (message, region, photo, sendAt) => async (dispatch) => {
    const postBody = new FormData();
    postBody.append('message', message);
    postBody.append('region', region);
    postBody.append('sendAt', sendAt);
    if (photo) {
      postBody.append('photo', photo);
    }
    const res = await server.post('/text/outgoing/scheduled', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: SEND_TEXT, payload: res.data });
    dispatch(setAlert('Message Sent'));
    router.navigate('/text/text-success');
  };

export const sendText =
  (message, region, photo, feedbackId, number) => async (dispatch) => {
    const postBody = new FormData();
    postBody.append('message', message);
    postBody.append('region', region);
    if (photo) {
      postBody.append('photo', photo);
    }
    if (feedbackId) {
      postBody.append('feedbackId', feedbackId);
    }
    if (number) {
      postBody.append('number', number);
    }
    const res = await server.post('/text/outgoing', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: SEND_TEXT, payload: res.data });
    dispatch(setAlert('Message Sent'));
    if (feedbackId) {
      dispatch({ type: EDIT_FEEDBACK, payload: { feedbackId, message } });
    }
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

export const getTextRecords = (startDate) => async (dispatch) => {
  const res = await server.get('/text/text-records/list/' + startDate);
  dispatch({ type: GET_TEXT_RECORDS, payload: res.data });
};

export const getScheduledTexts = () => async (dispatch) => {
  const { data } = await server.get('/text/scheduled');
  console.log(data);
  dispatch({ type: GET_RECURRING_TEXTS, payload: data });
};

export const deleteScheduledText = (idList) => async (dispatch) => {
  await server.post('/text/scheduled/delete', { ids: idList });
  dispatch({ type: DELETE_TEXT, payload: idList });
};
