import { UPLOAD_FILES, UPLOAD_IN_PROGRESS, ERROR } from '../actions/types';

const INITIAL_STATE = {
  files: [],
  inProgess: false,
};

const fileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return { files: action.payload.filesAdded, inProgress: false };
    case UPLOAD_IN_PROGRESS:
      return { ...state, inProgress: true };
    case ERROR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default fileReducer;
