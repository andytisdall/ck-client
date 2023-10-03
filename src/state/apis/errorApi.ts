import { api } from '../api';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';

type IncomingError = FetchBaseQueryError | SerializedError | undefined;

type StandardError = {
  message: string;
};

export const errorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    setError: builder.mutation<StandardError, any>({
      queryFn: (error) => {
        console.log(error);
        return error;
      },
    }),
  }),
});

export const { useSetErrorMutation } = errorApi;
