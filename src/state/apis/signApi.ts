import { api } from "../api";

const signApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSigningUrl: builder.query<
      { signingUrl: string },
      { doc?: string; contactId?: string; hoursId?: string }
    >({
      query: ({ doc, contactId, hoursId }) => {
        let url = "/sign/" + doc;
        if (contactId) {
          url += "/" + contactId;
        }
        if (hoursId) {
          url += "/" + hoursId;
        }
        return url;
      },
    }),
  }),
});

export const { useGetSigningUrlQuery } = signApi;
