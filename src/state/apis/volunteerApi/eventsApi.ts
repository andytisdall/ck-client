import { api } from '../../api';
import {
  GetVolunteerHoursArgs,
  VolunteerCampaign,
  VolunteerHours,
} from './types';

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<VolunteerCampaign[], void>({
      query: () => '/volunteers/events',
      providesTags: ['EventShifts'],
    }),
    getEventHours: builder.query<VolunteerHours[], GetVolunteerHoursArgs>({
      query: ({ campaignId, contactId }) =>
        `/volunteers/hours/${campaignId}/${contactId}`,
      providesTags: ['EventHours'],
    }),
  }),
});

export const { useGetEventsQuery, useGetEventHoursQuery } = eventsApi;
