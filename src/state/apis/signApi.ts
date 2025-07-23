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
    requestAgreement: builder.query<null, string>({
      query: (doc) => "/sign/emailAgreement/" + doc,
    }),
  }),
});

export const {
  useGetSigningUrlQuery,
  useGetSigningConfigQuery,
  useRequestAgreementQuery,
} = signApi;
