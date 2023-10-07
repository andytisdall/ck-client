import server from './api';
import { GET_EVENTS, GET_EVENT_HOURS, SIGN_UP_FOR_EVENT_SHIFT } from './types';

import { setAlert } from './alert';
import { router } from '../App';

export const getEventCampaigns = () => async (dispatch) => {
  const { data } = await server.get('/volunteers/events');
  dispatch({ type: GET_EVENTS, payload: data });
};

export const getEventHours = (campaignId) => async (dispatch) => {
  const res = await server.get('/volunteers/hours/' + campaignId);
  dispatch({ type: GET_EVENT_HOURS, payload: res.data });
};
