import server from './api';
import { setAlert } from './alert';
import { UPLOAD_FILES } from './types';
import { router } from '../App';

export const uploadFiles =
  (form, accountType, expiration) => async (dispatch, getState) => {
    const postBody = new FormData();
    Array.from(form.elements).forEach((input) => {
      if (input.files) {
        postBody.append(input.name, input.files[0]);
      }
      if (input.name === 'HD') {
        if (!expiration) {
          throw Error(
            'Health Department Permit and Expiration Date must be updated at the same time'
          );
        }
        postBody.append('expiration', expiration);
      }
    });
    let accountId;
    let page;
    if (accountType === 'restaurant') {
      accountId = getState().restaurant.restaurant.id;
      page = 'meal-program';
    }
    if (accountType === 'contact') {
      accountId = getState().user.user.id;
      page = 'home-chef/onboarding';
    }
    postBody.append('accountId', accountId);
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

    router.navigate(`/${page}/file-success`);
  };
