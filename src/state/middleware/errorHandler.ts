import {
  isRejectedWithValue,
  MiddlewareAPI,
  Middleware,
  SerializedError,
} from "@reduxjs/toolkit";

import { setError } from "../apis/slices/errorSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AnyAction } from "@reduxjs/toolkit";

type ServerErrorPayload = { data: { error: string }; status: number };

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if (isRejectedWithValue(action)) {
      // console.log(action);
      const error = action.payload as
        | SerializedError
        | ServerErrorPayload
        | FetchBaseQueryError
        | undefined;

      let message = "";

      if (error) {
        if ("status" in error) {
          const data = error.data as { error?: string };
          if (typeof data?.error === "string") {
            message = data.error;
          } else if (data) {
            message = JSON.stringify(data);
          }
        } else if (error.message) {
          message = error.message;
        }
        console.log(message);
        api.dispatch(setError(message));
      }
    }

    return next(action);
  };

// {type: 'error/setError', payload: {…}}
// payload
// :
// {status: 401, data: {…}}
// type
// :
// "error/setError"

//
// payload
// :
// {status: 'FETCH_ERROR', error: 'TypeError: Failed to fetch'}
// type
// :
// "error/setError"
