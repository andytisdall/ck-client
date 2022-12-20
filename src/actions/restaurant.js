import { FETCH_RESTAURANT, RESTAURANT_CREATED, CLEAR_MESSAGES } from './types';
import server from './api';
import { setError } from './error';

export const getRestaurant = () => async (dispatch) => {
  try {
    const res = await server.get('/restaurant');
    dispatch({ type: FETCH_RESTAURANT, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const createRestaurant =
  (name, salesforceId, userId) => async (dispatch) => {
    try {
      const res = await server.post('/restaurant', {
        name,
        salesforceId,
        userId,
      });
      dispatch({ type: RESTAURANT_CREATED });
      setTimeout(() => {
        dispatch({ type: CLEAR_MESSAGES });
      }, 10000);
    } catch (err) {
      dispatch(setError(err));
    }
  };
