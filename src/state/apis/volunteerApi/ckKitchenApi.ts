import _ from 'lodash';

import { api } from '../../api';
import {
  Volunteer,
  CreateVolunteerArgs,
  JobShiftsState,
  GetShiftsResponse,
  VolunteerHoursState,
  VolunteerHours,
  CreateVolunteerResponse,
} from './types';

export const ckKitchenApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVolunteer: builder.query<Volunteer | null, string | undefined>({
      query: (email) => '/volunteers/' + email,
      providesTags: ['Volunteer'],
    }),
    createVolunteer: builder.mutation<
      CreateVolunteerResponse,
      CreateVolunteerArgs
    >({
      query: (body) => ({
        url: '/volunteers',
        body,
        method: 'POST',
      }),
    }),
    getKitchenShifts: builder.query<JobShiftsState, void>({
      query: () => '/volunteers/kitchen',
      transformResponse: (response: GetShiftsResponse) => {
        return {
          jobs: response.jobs,
          shifts: _.mapKeys(response.shifts, 'id'),
        };
      },
    }),
    getKitchenHours: builder.query<VolunteerHoursState, string | undefined>({
      transformResponse: (response: VolunteerHours[]) =>
        _.mapKeys(response, 'id'),
      query: (contactId) => {
        if (contactId) {
          return '/volunteers/kitchen/hours/' + contactId;
        } else {
          return '/volunteers/kitchen/hours';
        }
      },
      providesTags: ['CkKitchenHours'],
    }),
  }),
});

export const {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
  useGetKitchenShiftsQuery,
  useGetKitchenHoursQuery,
} = ckKitchenApi;
