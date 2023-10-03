import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import errorReducer from './apis/slices/errorSlice';
import { rtkQueryErrorLogger } from './middleware/errorHandler';

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer, error: errorReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(rtkQueryErrorLogger).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
