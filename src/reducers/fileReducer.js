import { UPLOAD_FILES } from '../actions/types';

const INITIAL_STATE = {
  files: [],
};

const fileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return { files: action.payload.filesAdded };
    default:
      return state;
  }
};
export default fileReducer;
