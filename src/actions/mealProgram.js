import server from './api';
import { GET_MEAL_PROGRAM_SCHEDULE } from './types';

export const getMealProgramSchedule = () => async (dispatch, getState) => {
  let endpoint = '';
  if (!getState().user.user.admin) {
    endpoint = '/' + getState().restaurant.restaurant.salesforceId;
  }
  const { data } = await server.get('/meal-program/schedule' + endpoint);
  dispatch({ type: GET_MEAL_PROGRAM_SCHEDULE, payload: data });
};
