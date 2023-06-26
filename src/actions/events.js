import server from './api';
import { GET_EVENTS, GET_EVENT_HOURS, SIGN_UP_FOR_EVENT_SHIFT } from './types';

import { setAlert } from './alert';
import { router } from '../App';

export const getEventCampaigns = () => async (dispatch) => {
  const { data } = await server.get('/events');
  dispatch({ type: GET_EVENTS, payload: data });
};

export const getEventHours = (campaignId) => async (dispatch) => {
  const res = await server.get('/events/hours/' + campaignId);
  dispatch({ type: GET_EVENT_HOURS, payload: res.data });
};

export const signUpForEventShift =
  (shiftId, jobId, date) => async (dispatch) => {
    const { data } = await server.post('/events/hours', {
      shiftId,
      jobId,
      date,
    });
    dispatch({ type: SIGN_UP_FOR_EVENT_SHIFT, payload: data });
    dispatch(setAlert('You Signed Up For A Shift'));
    router.navigate('/home-chef/events/signup-confirm/' + data.id);
  };