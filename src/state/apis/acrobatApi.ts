import { api } from '../api';

const acrobatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSigningUrl: builder.query<
      { signingUrl: string },
      { doc?: string; id?: string }
    >({
      query: ({ doc, id }) => `/acrobat/${doc}${id ? '/' + id : ''}`,
    }),
    updateContact: builder.mutation<null, { doc?: string; email?: string }>({
      query: (body) => ({
        url: '/acrobat/update-contact',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserInfo', 'RestaurantInfo', 'Volunteer'],
    }),
  }),
});

export const { useGetSigningUrlQuery, useUpdateContactMutation } = acrobatApi;
