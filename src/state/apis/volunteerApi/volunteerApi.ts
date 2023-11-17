import { api } from '../../api';
import {
  VolunteerHours,
  SignUpForVolunteerShiftArgs,
  CancelVolunteerHoursArgs,
  Volunteer,
  CreateVolunteerArgs,
  CreateVolunteerResponse,
} from './types';

export const volunteerApi = api.injectEndpoints({
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

    signUpForVolunteerShift: builder.mutation<
      VolunteerHours,
      SignUpForVolunteerShiftArgs
    >({
      query: (body) => ({
        url: '/volunteers/hours',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        'EventHours',
        'EventShifts',
        'CkKitchenHours',
        'CkKitchenShifts',
      ],
    }),

    cancelVolunteerShift: builder.mutation<null, CancelVolunteerHoursArgs>({
      query: (body) => {
        let url = '/volunteers/hours/' + body.hoursId;
        if (body.contactId) {
          url = url + '/' + body.contactId;
        }
        return { url, method: 'DELETE' };
      },
      invalidatesTags: [
        'CkKitchenHours',
        'CkKitchenShifts',
        'EventHours',
        'EventShifts',
      ],
    }),
  }),
});

export const {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,

  useSignUpForVolunteerShiftMutation,
  useCancelVolunteerShiftMutation,
} = volunteerApi;
