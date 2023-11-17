import { api } from '../../api';
import { AddPhoneArgs, GetPhoneNumberResponse } from './types';

export const phoneApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addPhone: builder.mutation<null, AddPhoneArgs>({
      query: (body) => ({
        url: '/text/phone',
        method: 'POST',
        body,
      }),
    }),

    getPhoneNumber: builder.query<GetPhoneNumberResponse, string>({
      query: (number) => ({
        url: '/text/phone/' + number,
      }),
    }),

    deletePhone: builder.mutation<null, string>({
      query: (number) => ({
        url: '/text/phone/' + number,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddPhoneMutation,
  useDeletePhoneMutation,
  useLazyGetPhoneNumberQuery,
} = phoneApi;
