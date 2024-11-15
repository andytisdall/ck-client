import { api } from '../api';

const acrobatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.mutation<null, void>({
      query: () => ({
        method: 'POST',
        url: '/acrobat',
      }),
    }),
  }),
});

export const { useGetTokenMutation } = acrobatApi;
