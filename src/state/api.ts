import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

let url = 'http://localhost:3001/api/';

const baseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
  const token = localStorage.getItem('ck-token');
  const baseQuery = fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      // headers.set('Content-type', 'application/json');
      // headers.append('Content-type', 'application/json');
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  });
  return baseQuery(args, baseQueryApi, extraOptions);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithToken,
  endpoints: () => ({}),
  tagTypes: ['User'],
});
