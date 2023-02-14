import { UPLOAD_FILES, GET_DOCUSIGN_URL } from '../actions/types';

const INITIAL_STATE = {
  files: [],
  docusignUrl: null,
};

const fileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return { docusignUrl: null, files: action.payload.filesAdded };
    case GET_DOCUSIGN_URL:
      return { ...state, docusignUrl: action.payload };
    default:
      return state;
  }
};
export default fileReducer;
