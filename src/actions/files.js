import server from './api';
import { setAlert } from './alert';
import { getUserInfo } from './user';
import { getMealProgramInfo } from './restaurant';
import { UPLOAD_FILES, UPLOAD_IN_PROGRESS } from './types';
import { router } from '../App';

export const uploadFiles =
  (form, accountType, expiration) => async (dispatch) => {
    dispatch({ type: UPLOAD_IN_PROGRESS });
    const postBody = new FormData();
    Array.from(form.elements).forEach((input) => {
      if (input.files?.length) {
        postBody.append(input.name, input.files[0]);
        if (input.name === 'HD') {
          if (!expiration) {
            throw Error(
              'Health Department Permit and Expiration Date must be updated at the same time'
            );
          }
          postBody.append('expiration', expiration);
        }
      }
    });
    postBody.append('accountType', accountType);

    const res = await server.post('/files', postBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({ type: UPLOAD_FILES, payload: res.data });
    dispatch(
      setAlert(
        `You have successfully uploaded ${res.data.filesAdded.length} files`
      )
    );
    let page;
    if (accountType === 'restaurant') {
      page = 'meal-program/onboarding';
      dispatch(getMealProgramInfo());
    }
    if (accountType === 'contact') {
      page = 'home-chef/onboarding';
      dispatch(getUserInfo());
    }

    router.navigate(`/${page}/file-success`);
  };
