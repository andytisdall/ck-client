import { ERROR } from './types';

export const setError = (err) => (dispatch) => {
  let message;
  if (err.response?.data?.err) {
    message = err.response.data.error;
  } else {
    message = err.message;
  }
  console.log(err);
  // setTimeout(() => {
  //   dispatch({ type: ERROR, payload: null });
  // }, 7000);
  dispatch({ type: ERROR, payload: message });
};
