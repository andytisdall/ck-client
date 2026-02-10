import { api } from "../../api";
import { VolunteerHours } from "./types";

export interface VolunteerForCheckIn {
  hoursId: string;
  contactId: string;
  firstName?: string;
  lastName: string;
  email?: string;
  volunteerAgreement: boolean;
  status: string;
}

interface ShiftForCheckIn {
  id: string;
  jobName: string;
  startTime: string;
  duration: number;
}

interface JobForCheckIn {
  name: string;
  shifts: string[];
  id: string;
}

export type CheckInShiftsResponse = {
  jobs: Record<string, JobForCheckIn>;
  shifts: Record<string, ShiftForCheckIn>;
};

const checkInApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodaysShifts: builder.query<CheckInShiftsResponse | null, void>({
      query: () => "/volunteers/check-in/shifts",
    }),

    getVolunteersForCheckIn: builder.query<VolunteerForCheckIn[], string>({
      query: (shiftId) => "/volunteers/check-in/" + shiftId,
      providesTags: ["VolunteerCheckInList"],
    }),
    checkInVolunteer: builder.mutation<
      null,
      { hoursId: string; duration: number }
    >({
      query: (body) => ({
        url: "/volunteers/check-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["VolunteerCheckInList"],
    }),
    createVolunteerHours: builder.mutation<
      VolunteerHours,
      { shiftId: string; contactId: string }
    >({
      query: (body) => ({
        body,
        url: "/volunteers/check-in/hours",
        method: "POST",
      }),
      invalidatesTags: ["VolunteerCheckInList"],
    }),
  }),
});

export const {
  useGetVolunteersForCheckInQuery,
  useCheckInVolunteerMutation,
  useGetTodaysShiftsQuery,
  useCreateVolunteerHoursMutation,
} = checkInApi;
