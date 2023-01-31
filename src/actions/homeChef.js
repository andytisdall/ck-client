import server from './api';
import { GET_SHIFTS, SIGN_UP_FOR_SHIFT } from './types';
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
