import server from './api';
import { setAlert } from './alert';
import { UPLOAD_FILES } from './types';

export const getDocusignUrl = (accountType) => async (dispatch) => {
  const res = await server.post('/docusign/sign', {
    accountType,
  });
  window.location.href = res.data;
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
  };
