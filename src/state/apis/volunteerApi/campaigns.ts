import { api } from '../../api';
import { VolunteerCampaign } from './types';

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<VolunteerCampaign[], void>({
      query: () => '/volunteers/events',
      providesTags: ['VolunteerShifts'],
    }),
  }),
});

export const { useGetCampaignsQuery } = eventsApi;
