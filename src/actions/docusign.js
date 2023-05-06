import server from './api';
import { setAlert } from './alert';
import { UPLOAD_FILES } from './types';

export const getDocusignUrl = (doc) => async () => {
  const res = await server.post('/docusign/sign', {
    doc,
  });
  window.location.href = res.data;
};

export const uploadDocsToSalesforce = (doc, envelopeId) => async (dispatch) => {
  const { data } = await server.post('/docusign/getDoc', {
    envelopeId,
    doc,
  });
  dispatch({
    type: UPLOAD_FILES,
    payload: { filesAdded: data.filesAdded, doc },
  });
  dispatch(setAlert(`You have uploaded ${data.filesAdded.length} files`));
};
