import server from './api';
import { setError } from './error';
import { setAlert } from './alert';
import { GET_RECIPES, GET_RECIPE, CREATE_RECIPE, EDIT_RECIPE } from './types';

export const getRecipes = () => async (dispatch) => {
  try {
    const res = await server.get('/recipes');
    dispatch({ type: GET_RECIPES, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const getRecipe = (id) => async (dispatch) => {
  try {
    const res = await server.get(`/recipe/${id}`);
    dispatch({ type: GET_RECIPE, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const createRecipe = (form) => async (dispatch) => {
  const postBody = new FormData();
  Array.from(form.elements).forEach((input) => {
    if (input.files) {
      postBody.append(input.name, input.files[0]);
    } else if (input.name) {
      postBody.append(input.name, input.value);
    }
  });
  try {
    const res = await server.post('/recipe', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: CREATE_RECIPE, payload: res.data });
    dispatch(setAlert('Recipe Created'));
  } catch (err) {
    dispatch(setError(err));
  }
};

export const editRecipe = (formValues) => async (dispatch) => {
  const postBody = new FormData();
  for (let key in formValues) {
    postBody.append(key, formValues[key]);
  }
  try {
    const res = await server.patch(`/recipe/${formValues.recipeId}`, postBody);
    dispatch({ type: EDIT_RECIPE, payload: res.data });
    dispatch(setAlert('Recipe Edited'));
  } catch (err) {
    dispatch(setError(err));
  }
};
