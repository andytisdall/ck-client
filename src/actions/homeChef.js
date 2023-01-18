import server from './api';
import { GET_SHIFTS } from './types';

export const submitInterestForm = (formValues) => async (dispatch) => {};

export const getShifts = () => async (dispatch) => {
  const { data } = await server.get('/home-chef-job-listing');
  dispatch({ type: GET_SHIFTS, payload: data });
};
