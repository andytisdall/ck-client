import { api } from "../api";
import { SignArgs } from "@community-kitchens/apiinterfaces";

const signApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSigningUrl: builder.query<{ signingUrl: string }, SignArgs>({
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
