import server from './api';
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
  const res = await server.get('/home-chef/recipes');
  dispatch({ type: GET_RECIPES, payload: res.data });
};

export const getRecipe = (id) => async (dispatch) => {
  const res = await server.get(`/home-chef/recipe/${id}`);
  dispatch({ type: GET_RECIPE, payload: res.data });
};

export const createRecipe = (formValues) => async (dispatch) => {
  const postBody = new FormData();
  for (let key in formValues) {
    postBody.append(key, formValues[key]);
  }

  const res = await server.post('/home-chef/recipe', postBody, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  dispatch({ type: CREATE_RECIPE, payload: res.data });
  dispatch(setAlert('Recipe Created'));
  router.navigate('/home-chef/resources/recipes/' + res.data.id);
};

export const editRecipe = (id, formValues) => async (dispatch) => {
  const postBody = new FormData();
  for (let key in formValues) {
    postBody.append(key, formValues[key]);
  }

  const res = await server.patch(`/home-chef/recipe/${id}`, postBody, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  dispatch({ type: EDIT_RECIPE, payload: res.data });
  dispatch(setAlert('Recipe Edited'));
};

export const deleteRecipe = (id) => async (dispatch) => {
  await server.delete(`/home-chef/recipe/${id}`);
  dispatch({ type: DELETE_RECIPE, payload: id });
  dispatch(setAlert('Recipe Deleted'));
  router.navigate('/home-chef/resources/recipes');
};
