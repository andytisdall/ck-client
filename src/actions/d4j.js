import server from './api';

export const uploadFileToD4JVisit = (file) => async (dispatch) => {
  const postBody = new FormData();
  postBody.append('receipt', file);
  postBody.append('id', '0067900000DNCCGAA5');
  await server.post('/d4j/receipt', postBody, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
