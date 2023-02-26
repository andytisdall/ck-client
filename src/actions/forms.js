import server from './api';
import { SUBMIT_FORM } from './types';
import { setAlert } from './alert';
import { router } from '../App';

export const submitForm = (formValues, form) => async (dispatch) => {
  const urls = {
    MEAL_SURVEY: '/text/meal-survey',
    HOME_CHEF_INTEREST: '/home-chef/signup',
    TEXT_SIGNUP_SURVEY: '/text/signup-survey',
  };
  const url = urls[form.name];

  await server.post(url, formValues);
  dispatch({ type: SUBMIT_FORM, payload: form.successMessage });
  dispatch(setAlert('Form Submitted'));
  router.navigate('/forms/form-sent');
};
