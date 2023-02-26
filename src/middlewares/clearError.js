import { ERROR, CLEAR_ERROR } from '../actions/types';

const clearError =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function' && getState().error.error) {
      dispatch({ type: CLEAR_ERROR });
    }
    next(action);
  };

export default clearError;
