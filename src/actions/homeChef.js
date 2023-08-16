import server from './api';
import {
  GET_SHIFTS,
  SIGN_UP_FOR_SHIFT,
  GET_HOURS,
  EDIT_HOURS,
  GET_CAMPAIGN,
  GET_FRIDGES,
} from './types';
import { setAlert } from './alert';
import { router } from '../App';

export const getShifts = () => async (dispatch) => {
  const { data } = await server.get('/home-chef/job-listing');
  dispatch({ type: GET_SHIFTS, payload: data });
};

export const signUpForShift =
  (shiftId, mealCount, jobId, date, soup) => async (dispatch) => {
    const { data } = await server.post('/home-chef/hours', {
      shiftId,
      mealCount,
      jobId,
      date,
      soup,
    });
    dispatch({ type: SIGN_UP_FOR_SHIFT, payload: data });
    dispatch(setAlert('You Signed Up For A Shift'));
    router.navigate('/home-chef/signup-confirm/' + data.id);
  };

export const getHours = () => async (dispatch) => {
  const res = await server.get('/home-chef/hours');
  dispatch({ type: GET_HOURS, payload: res.data });
};

export const editHours =
  (id, mealCount, cancel) => async (dispatch, getState) => {
    const state = getState().homeChef;
    const hours = state.hours[id];
    const fridge = state.jobs.find((j) => j.id === hours.job).name;
    const date = hours.time;

    const res = await server.patch(`/home-chef/hours/${id}`, {
      mealCount,
      cancel,
      emailData: { fridge, date },
    });

    dispatch({ type: EDIT_HOURS, payload: res.data });
    router.navigate('/home-chef/chef');
    const alertMessage = cancel
      ? 'Canceled this delivery'
      : 'Successfully changed the number of meals to ' + mealCount;
    dispatch(setAlert(alertMessage));
  };

export const sendInvite =
  (recipients, message, subject) => async (dispatch) => {
    await server.post('./home-chef/invite', { recipients, message, subject });
    dispatch(setAlert('Invitation Email Was Sent!'));
    router.navigate('/home-chef/invite/sent');
  };

export const getCampaign = () => async (dispatch) => {
  const { data } = await server.get('/home-chef/campaign');
  dispatch({ type: GET_CAMPAIGN, payload: data });
};

export const getFridges = () => async (dispatch) => {
  const { data } = await server.get('/home-chef/campaign/fridges');
  dispatch({ type: GET_FRIDGES, payload: data });
};

export const sendHomeChefNotification =
  (title, message) => async (dispatch) => {
    await server.post('/home-chef/notifications', { title, message });
    dispatch(setAlert('Notification Sent!'));
    router.navigate('..');
  };
