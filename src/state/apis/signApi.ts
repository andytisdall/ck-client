import { api } from "../api";

const signApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSigningUrl: builder.query<
      { signingUrl: string },
      { doc?: string; contactId?: string; hoursId?: string }
    >({
      query: ({ doc, contactId, hoursId }) =>
        `/sign/${doc}${contactId ? `/${hoursId}/${contactId}` : ""}`,
    }),
    getSigningConfig: builder.query<{ limitReached: boolean }, void>({
      query: () => "/sign/config",
    }),
    requestHomeChefAgreement: builder.query<null, void>({
      query: () => "/sign/emailAgreement",
    }),
  }),
});

export const {
  useGetSigningUrlQuery,
  useGetSigningConfigQuery,
  useRequestHomeChefAgreementQuery,
} = signApi;
