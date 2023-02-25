import server from './api';
import { setError } from './error';
import { setAlert } from './alert';
import {
  GET_RECIPES,
  GET_RECIPE,
  CREATE_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
} from './types';
import { router } from '../App';

export const getRecipes = () => async (dispatch) => {
  try {
    const res = await server.get('/home-chef/recipes');
    dispatch({ type: GET_RECIPES, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const getRecipe = (id) => async (dispatch) => {
  try {
    const res = await server.get(`/home-chef/recipe/${id}`);
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
    const res = await server.post('/home-chef/recipe', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: CREATE_RECIPE, payload: res.data });
    dispatch(setAlert('Recipe Created'));
    router.navigate('/home-chef/resources/recipes');
  } catch (err) {
    dispatch(setError(err));
  }
};

export const editRecipe = (id, form) => async (dispatch) => {
  const postBody = new FormData();
  Array.from(form.elements).forEach((input) => {
    if (input.files) {
      console.log(input.name);
      postBody.append(input.name, input.files[0]);
    } else if (input.name) {
      postBody.append(input.name, input.value);
    }
  });
  try {
    const res = await server.patch(`/home-chef/recipe/${id}`, postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: EDIT_RECIPE, payload: res.data });
    dispatch(setAlert('Recipe Edited'));
    router.navigate('/home-chef/resources/recipes');
  } catch (err) {
    dispatch(setError(err));
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await server.delete(`/home-chef/recipe/${id}`);
    dispatch({ type: DELETE_RECIPE, payload: id });
    dispatch(setAlert('Recipe Deleted'));
    router.navigate('/home-chef/resources/recipes');
  } catch (err) {
    dispatch(setError(err));
  }
};
