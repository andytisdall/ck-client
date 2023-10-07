import { api } from '../../api';
import { EventCampaign, VolunteerHours } from './types';

const volunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventCampaign[], void>({
      query: () => '/volunteers/events',
    }),
    getEventHours: builder.query<VolunteerHours[], string>({
      query: (campaignId) => 'volunteers/hours/' + campaignId,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventHoursQuery } = volunteerApi;
