import server from './api';
import { GET_VOLUNTEER, CREATE_VOLUNTEER, GET_VOLUNTEER_JOBS } from './types';

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
