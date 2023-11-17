import _ from 'lodash';

import { api } from '../../api';
import {
  JobShiftsState,
  GetShiftsResponse,
  VolunteerHoursState,
  VolunteerHours,
} from './types';

export const ckKitchenApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getKitchenShifts: builder.query<JobShiftsState, void>({
      query: () => '/volunteers/kitchen',
      transformResponse: (response: GetShiftsResponse) => {
        return {
          jobs: response.jobs,
          shifts: _.mapKeys(response.shifts, 'id'),
        };
      },
      providesTags: ['CkKitchenShifts'],
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

export const { useGetKitchenShiftsQuery, useGetKitchenHoursQuery } =
  ckKitchenApi;
