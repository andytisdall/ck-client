import server from './api';
import { GET_MEAL_PROGRAM_SCHEDULE } from './types';

export const getMealProgramSchedule = () => async (dispatch) => {
  const { data } = await server.get('/meal-program/schedule');
  dispatch({ type: GET_MEAL_PROGRAM_SCHEDULE, payload: data });
};
