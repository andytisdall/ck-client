import { api } from "../../api";
import {
  VolunteerHours,
  CheckInShiftsResponse,
  VolunteerForCheckIn,
  CheckInArgs,
} from "@community-kitchens/apiinterfaces";

const checkInApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodaysShifts: builder.query<CheckInShiftsResponse | null, void>({
      query: () => "/volunteers/check-in/shifts",
    }),

    getVolunteersForCheckIn: builder.query<VolunteerForCheckIn[], string>({
      query: (shiftId) => "/volunteers/check-in/" + shiftId,
      providesTags: ["VolunteerCheckInList"],
    }),
    checkInVolunteer: builder.mutation<null, CheckInArgs>({
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
