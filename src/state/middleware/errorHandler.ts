import {
  isRejectedWithValue,
  MiddlewareAPI,
  Middleware,
} from '@reduxjs/toolkit';

import { errorApi } from '../apis/errorApi';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if (isRejectedWithValue(action)) {
    }

    return next(action);
  };
