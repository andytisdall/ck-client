import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
// import errorReducer from '../reducers/errorReducer';
import { rtkQueryErrorLogger } from './middleware/errorHandler';

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(rtkQueryErrorLogger),
});
