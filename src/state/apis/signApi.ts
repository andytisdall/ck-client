import { api } from '../api';

const signApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSigningUrl: builder.query<
      { signingUrl: string },
      { doc?: string; contactId?: string; shiftId?: string }
    >({
      query: ({ doc, contactId, shiftId }) =>
        `/sign/${doc}${contactId ? `/${shiftId}/${contactId}` : ''}`,
    }),
    getSigningConfig: builder.query<{ limitReached: boolean }, void>({
      query: () => '/sign/config',
    }),
    requestHomeChefAgreement: builder.query<null, void>({
      query: () => '/sign/emailAgreement',
    }),
  }),
});

export const {
  useGetSigningUrlQuery,
  useGetSigningConfigQuery,
  useRequestHomeChefAgreementQuery,
} = signApi;
