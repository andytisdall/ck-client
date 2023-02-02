import server from './api';
import { GET_SHIFTS, SIGN_UP_FOR_SHIFT, GET_HOURS } from './types';
import { setError } from './error';
import { setAlert } from './alert';

export const getShifts = () => async (dispatch) => {
  try {
    const { data } = await server.get('/home-chef/job-listing');
    dispatch({ type: GET_SHIFTS, payload: data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const signUpForShift =
  (shiftId, mealCount, jobId, date) => async (dispatch) => {
    try {
      const { data } = await server.post('/home-chef/job-listing', {
        shiftId,
        mealCount,
        jobId,
        date,
      });
      dispatch({ type: SIGN_UP_FOR_SHIFT, payload: data });
      dispatch(setAlert('You Signed Up For A Shift'));
    } catch (err) {
      dispatch(setError(err));
    }
  };

export const getHours = () => async (dispatch) => {
  try {
    const res = await server.get('/home-chef/hours');
    dispatch({ type: GET_HOURS, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};
