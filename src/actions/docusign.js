import server from './api';
import { setAlert } from './alert';
import { UPLOAD_FILES } from './types';

export const getDocusignUrl = (accountType) => async () => {
  const res = await server.post('/docusign/sign', {
    accountType,
  });
  window.location.href = res.data;
};

export const uploadDocsToSalesforce =
  (accountType, envelopeId) => async (dispatch) => {
    const { data } = await server.post('/docusign/getDoc', {
      envelopeId,
      accountType,
    });
    dispatch({
      type: UPLOAD_FILES,
      payload: { filesAdded: data.filesAdded, accountType },
    });
    dispatch(setAlert(`You have uploaded ${data.filesAdded.length} files`));
  };
