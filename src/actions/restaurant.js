import { FETCH_RESTAURANT, FETCH_ALL_RESTAURANTS, EDIT_RESTAURANT } from './types';
import server from './api';
import { setError } from './error';
import { setAlert } from './alert';

export const getRestaurant = () => async (dispatch) => {
  try {
    const res = await server.get('/restaurant');
    dispatch({ type: FETCH_RESTAURANT, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const getAllRestaurants = () => async (dispatch) => {
  try {
    const res = await server.get('/restaurants');
    dispatch({ type: FETCH_ALL_RESTAURANTS, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const createRestaurant =
  (name, salesforceId, userId) => async (dispatch) => {
    try {
      await server.post('/restaurant', {
        name,
        salesforceId,
        userId,
      });
      dispatch(setAlert('Restaurant Created'));
    } catch (err) {
      dispatch(setError(err));
    }
  };

export const editRestaurant = (restaurant, user, username, password) => async (dispatch) => {
  try {
    const res = await server.patch('/restaurant', {
      restaurant,
      user,
      username,
      password,
    });
    dispatch({ type: EDIT_RESTAURANT, payload: res.data });
  }catch (err) {
    dispatch(setError(err));
  }
}