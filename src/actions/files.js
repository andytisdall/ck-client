import { FILES_UPLOADED } from './types';
import server from './api';
import { setError } from './error';

export const uploadFiles = (form) => async (dispatch, getState) => {
  const postBody = new FormData();
  Array.from(form.elements).forEach((input) => {
    if (input.files) {
      postBody.append(input.name, input.files[0]);
    }
    if (input.name === 'expiration') {
      postBody.append('expiration', input.value);
    }
  });
  const restaurantId = getState().restaurant.id;
  postBody.append('restaurant', restaurantId);
  try {
    const res = await server.post('/files', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: FILES_UPLOADED, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};
