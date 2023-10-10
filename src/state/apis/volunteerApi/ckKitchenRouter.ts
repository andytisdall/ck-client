import _ from 'lodash';

import { api } from '../../api';
import {
  Volunteer,
  CreateVolunteerArgs,
  JobShiftsState,
  GetShiftsResponse,
  VolunteerHoursState,
  VolunteerHours,
} from './types';

const ckKitchenApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVolunteer: builder.query<Volunteer | null, string>({
      query: (email) => '/volunteers/' + email,
    }),
    createVolunteer: builder.mutation<Volunteer, CreateVolunteerArgs>({
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
    getKitchenHours: builder.query<VolunteerHoursState, void>({
      transformResponse: (response: VolunteerHours[]) =>
        _.mapKeys(response, 'id'),
      query: () => '/volunteers/kitchen',
    }),
  }),
});

export const {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
  useGetKitchenShiftsQuery,
  useGetKitchenHoursQuery,
} = ckKitchenApi;
