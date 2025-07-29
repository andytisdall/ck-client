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
  }),
});

export const { useGetSigningUrlQuery } = signApi;
