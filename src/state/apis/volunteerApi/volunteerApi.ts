import { api } from '../../api';
import {
  EventCampaign,
  VolunteerHours,
  SignUpForVolunteerShiftArgs,
} from './types';

const volunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventCampaign[], void>({
      query: () => '/volunteers/events',
    }),
    getEventHours: builder.query<VolunteerHours[], string>({
      query: (campaignId) => 'volunteers/hours/' + campaignId,
    }),
    signUpForVolunteerShift: builder.mutation<
      VolunteerHours,
      SignUpForVolunteerShiftArgs
    >({
      query: (body) => ({
        url: '/volunteers/hours',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventHoursQuery,
  useSignUpForVolunteerShiftMutation,
} = volunteerApi;
