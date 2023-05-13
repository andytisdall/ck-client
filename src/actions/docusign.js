import server from './api';
import { setAlert } from './alert';
import { getUserInfo } from './user';
import { getMealProgramInfo } from './restaurant';
import { UPLOAD_FILES, UPLOAD_IN_PROGRESS } from './types';

export const getDocusignUrl = (doc) => async () => {
  const res = await server.post('/docusign/sign', {
    doc,
  });
  window.location.href = res.data;
};

export const uploadDocsToSalesforce = (doc, envelopeId) => async (dispatch) => {
  dispatch({ type: UPLOAD_IN_PROGRESS });
  const { data } = await server.post('/docusign/getDoc', {
    envelopeId,
    doc,
  });
  dispatch({
    type: UPLOAD_FILES,
    payload: { filesAdded: data.filesAdded },
  });
  if (doc === 'HC') {
    dispatch(getUserInfo());
  } else {
    dispatch(getMealProgramInfo());
  }
  dispatch(setAlert(`You have uploaded ${data.filesAdded.length} file(s)`));
};
