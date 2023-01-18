import server from './api';

import { SUBMIT_FORM } from './types';
import { setError } from './error';
import { setAlert } from './alert';

export const submitForm = (formValues, form) => async (dispatch) => {
  const urls = {
    MEAL_SURVEY: 'meal-survey',
    HOME_CHEF_INTEREST: 'home-chef',
  };
  const url = urls[form.name];

  try {
    await server.post(`/forms/${url}`, formValues);
    dispatch({ type: SUBMIT_FORM, payload: form.successMessage });
    dispatch(setAlert('Form Submitted'));
  } catch (err) {
    setError(err);
  }
};
