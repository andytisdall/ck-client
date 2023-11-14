import _ from 'lodash';

import { api } from '../../api';
import {
  EventCampaign,
  VolunteerHours,
  SignUpForVolunteerShiftArgs,
  VolunteerHoursState,
} from './types';

const volunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventCampaign[], void>({
      query: () => '/volunteers/events',
    }),
    getEventHours: builder.query<VolunteerHoursState, string>({
      transformResponse: (response: VolunteerHours[]) =>
        _.mapKeys(response, 'id'),
      query: (campaignId) => '/volunteers/hours/' + campaignId,
      providesTags: ['EventHours'],
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
      invalidatesTags: ['EventHours', 'CkKitchenHours', 'CkKitchenShifts'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventHoursQuery,
  useSignUpForVolunteerShiftMutation,
} = volunteerApi;
