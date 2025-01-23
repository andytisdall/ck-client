import { api } from '../../api';

export interface VolunteerForCheckIn {
  hoursId: string;
  contactId: string;
  firstName?: string;
  lastName: string;
  email?: string;
  volunteerAgreement: boolean;
  status: string;
}

const kitchenApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodaysShift: builder.query<{ shiftId: string } | null, void>({
      query: () => '/volunteers/check-in/shifts',
    }),
    getVolunteersForCheckIn: builder.query<VolunteerForCheckIn[], string>({
      query: (shiftId) => '/volunteers/check-in/' + shiftId,
      providesTags: ['VolunteerCheckInList'],
    }),
    checkInVolunteer: builder.mutation<null, { hoursId: string }>({
      query: (body) => ({
        url: '/volunteers/check-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VolunteerCheckInList'],
    }),
    createVolunteerHours: builder.mutation<
      null,
      { shiftId: string; contactId: string }
    >({
      query: (body) => ({
        body,
        url: '/volunteers/check-in/hours',
        method: 'POST',
      }),
      invalidatesTags: ['VolunteerCheckInList'],
    }),
  }),
});

export const {
  useGetVolunteersForCheckInQuery,
  useCheckInVolunteerMutation,
  useGetTodaysShiftQuery,
  useCreateVolunteerHoursMutation,
} = kitchenApi;
