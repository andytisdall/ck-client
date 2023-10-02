import server from './api';
import {
  GET_VOLUNTEER,
  CREATE_VOLUNTEER,
  GET_VOLUNTEER_JOBS,
  SIGN_UP_FOR_VOLUNTEER_SHIFT,
} from './types';
import { router } from '../App';
import { setAlert } from './alert';

export const getVolunteer = (email) => async (dispatch) => {
  const { data } = await server.get('/volunteers/' + email);
  dispatch({ type: GET_VOLUNTEER, payload: data });
};

export const createVolunteer =
  (email, firstName, lastName) => async (dispatch) => {
    const { data } = await server.post('/volunteers', {
      email,
      firstName,
      lastName,
    });
    dispatch({ type: CREATE_VOLUNTEER, payload: data });
  };

export const getKitchenShifts = () => async (dispatch) => {
  const { data } = await server.get('/volunteers/kitchen');
  dispatch({ type: GET_VOLUNTEER_JOBS, payload: data });
};

export const signUpForVolunteerShift =
  (shiftId, jobId, date, contactSalesforceId) => async (dispatch) => {
    const { data } = await server.post('/volunteers/hours', {
      shiftId,
      jobId,
      date,
      contactSalesforceId,
    });
    dispatch({ type: SIGN_UP_FOR_VOLUNTEER_SHIFT, payload: data });
    dispatch(setAlert('You Signed Up For A Shift'));
    router.navigate('/volunteers/ck-kitchen/signup-confirm/' + data.id);
  };
