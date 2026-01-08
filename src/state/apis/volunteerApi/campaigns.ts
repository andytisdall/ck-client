import { api } from "../../api";
import { VolunteerCampaign } from "./types";

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<VolunteerCampaign[], void>({
      query: () => "/volunteers/campaigns",
      providesTags: ["VolunteerShifts"],
    }),
    getCampaignPhotos: builder.query<string[], string>({
      query: (campaignId) => `/volunteers/campaigns/${campaignId}/photos`,
    }),
  }),
});

export const { useGetCampaignsQuery, useGetCampaignPhotosQuery } = eventsApi;
