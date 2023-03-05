import { UPLOAD_FILES } from '../actions/types';

const INITIAL_STATE = {
  files: [],
  docusignUrl: null,
};

const fileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return { docusignUrl: null, files: action.payload.filesAdded };
    default:
      return state;
  }
};
export default fileReducer;
