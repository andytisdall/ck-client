import server from './api';
import { setError } from './error';
import { setAlert } from './alert';
import { GET_DOCUSIGN_URL, UPLOAD_FILES } from './types';

export const getDocusignUrl = (accountType) => async (dispatch) => {
  try {
    const res = await server.post('/docusign/sign', {
      accountType,
    });
    dispatch({ type: GET_DOCUSIGN_URL, payload: res.data });
  } catch (err) {
    dispatch(setError(err));
  }
};

export const uploadDocsToSalesforce =
  (accountType, envelopeId) => async (dispatch, getState) => {
    let account;
    if (accountType === 'restaurant') {
      account = getState().restaurant.restaurant;
    }
    if (accountType === 'contact') {
      account = getState().user.user;
    }
    try {
      const { data } = await server.post('/docusign/getDoc', {
        accountId: account.id,
        envelopeId,
        accountType,
      });
      dispatch({
        type: UPLOAD_FILES,
        payload: { filesAdded: data.filesAdded, accountType },
      });
      dispatch(setAlert(`You have uploaded ${data.filesAdded.length} files`));
    } catch (err) {
      dispatch(setError(err));
    }
  };
