import _ from 'lodash';

import {
  GET_FEEDBACK,
  EDIT_FEEDBACK,
  DELETE_FEEDBACK,
  SEND_TEXT,
  GET_PHONE_NUMBER,
  CLEAR_NUMBER,
  GET_TEXT_RECORDS,
  GET_RECURRING_TEXTS,
  DELETE_TEXT,
} from '../actions/types';

const INITIAL_STATE = {
  feedback: null,
  sent: null,
  number: null,
  scheduledTexts: null,
};

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_TEXT:
      return { ...state, sent: action.payload };
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: { ..._.mapKeys(action.payload, (i) => i.id) },
      };
    case EDIT_FEEDBACK:
      const fb = state.feedback[action.payload.feedbackId];
      if (fb.response) {
        fb.response.push(action.payload.message);
      } else fb.response = [action.payload.message];
      return {
        ...state,
        feedback: { ...state.feedback, [fb.id]: fb },
      };
    case DELETE_FEEDBACK:
      const { feedback } = state;
      delete feedback[action.payload];
      return { ...state, feedback: { ...feedback } };
    case GET_PHONE_NUMBER:
      return { ...state, number: action.payload };
    case CLEAR_NUMBER:
      return { ...state, number: null };
    case GET_TEXT_RECORDS:
      return { ...state, textRecords: action.payload };
    case GET_RECURRING_TEXTS:
      return { ...state, scheduledTexts: action.payload };
    case DELETE_TEXT:
      return {
        ...state,
        scheduledTexts: state.scheduledTexts.filter(
          (txt) => !action.payload.includes(txt.sid)
        ),
      };
    default:
      return state;
  }
};

export default textReducer;
