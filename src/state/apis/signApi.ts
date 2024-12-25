import { api } from '../api';

const signApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSigningUrl: builder.query<
      { signingUrl: string },
      { doc?: string; contactId?: string }
    >({
      query: ({ doc, contactId }) =>
        `/sign/${doc}${contactId ? '/' + contactId : ''}`,
    }),
    getKitchenSigningUrl: builder.mutation<
      { signingUrl: string },
      { firstName: string; lastName: string; email: string }
    >({
      query: (body) => ({
        body,
        url: '/sign/kitchen',
        method: 'POST',
      }),
    }),
    updateContact: builder.mutation<
      null,
      { doc?: string; email?: string; envelopeId?: string }
    >({
      query: (body) => ({
        url: '/sign/update-contact',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserInfo', 'RestaurantInfo', 'Volunteer'],
    }),
  }),
});

export const {
  useGetSigningUrlQuery,
  useUpdateContactMutation,
  useGetKitchenSigningUrlMutation,
} = signApi;
