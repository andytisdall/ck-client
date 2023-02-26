import createThunkErrorCatchMiddleware from 'redux-thunk-error-handler';

import { ERROR } from '../actions/types';

const errorHandler = (err) => {
  let message;
  if (err.response?.data?.error) {
    message = err.response.data.error;
  } else {
    message = err.message;
  }
  console.log(err);

  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: ERROR, payload: null });
    }, 7000);
    dispatch({ type: ERROR, payload: message });
  };
};

const errorHandlerMiddleware = createThunkErrorCatchMiddleware({
  onError: errorHandler,
});

export default errorHandlerMiddleware;
