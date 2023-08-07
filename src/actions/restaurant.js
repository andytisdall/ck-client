import {
  FETCH_RESTAURANT,
  FETCH_ALL_RESTAURANTS,
  EDIT_RESTAURANT,
  FETCH_MEAL_PROGRAM_INFO,
} from './types';
import server from './api';
import { setAlert } from './alert';

export const getRestaurant = () => async (dispatch) => {
  const res = await server.get('/meal-program/restaurant');
  dispatch({ type: FETCH_RESTAURANT, payload: res.data });
};

export const getMealProgramInfo = () => async (dispatch) => {
  const res = await server.get('/meal-program/restaurant/meal-program-info');
  dispatch({ type: FETCH_MEAL_PROGRAM_INFO, payload: res.data });
};

export const getAllRestaurants = () => async (dispatch) => {
  const res = await server.get('/meal-program/restaurant/all');
  dispatch({ type: FETCH_ALL_RESTAURANTS, payload: res.data });
};

export const createRestaurant =
  (name, salesforceId, userId) => async (dispatch) => {
    await server.post('/meal-program/restaurant', {
      name,
      salesforceId,
      userId,
    });
    dispatch(setAlert('Restaurant Created'));
  };

export const editRestaurant =
  (restaurantId, name, salesforceId, userId) => async (dispatch) => {
    const res = await server.patch('/meal-program/restaurant', {
      restaurantId,
      name,
      salesforceId,
      userId,
    });
    dispatch({ type: EDIT_RESTAURANT, payload: res.data });
    dispatch(setAlert('Restaurant Edited'));
  };
