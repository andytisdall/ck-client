import { api } from "../../api";
import {
  VolunteerHours,
  CreateVolunteerHoursArgs,
  CancelVolunteerHoursArgs,
  Volunteer,
  CreateVolunteerArgs,
  GetVolunteerHoursArgs,
} from "@community-kitchens/apiinterfaces";

export const volunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVolunteer: builder.query<Volunteer | null, string | undefined>({
      query: (email) => "/volunteers/" + email,
      providesTags: ["Volunteer"],
    }),

    getHours: builder.query<VolunteerHours[], GetVolunteerHoursArgs>({
      query: ({ campaignId, contactId }) =>
        `/volunteers/hours/${campaignId}/${contactId}`,
      providesTags: ["VolunteerHours"],
    }),
    getHour: builder.query<VolunteerHours, string>({
      query: (hoursId) => `volunteers/hour/${hoursId}`,
      providesTags: ["VolunteerHours"],
    }),
    createVolunteer: builder.mutation<Volunteer, CreateVolunteerArgs>({
      query: (body) => ({
        url: "/volunteers",
        body,
        method: "POST",
      }),
    }),

    signUpForVolunteerShift: builder.mutation<
      VolunteerHours,
      CreateVolunteerHoursArgs
    >({
      query: (body) => ({
        url: "/volunteers/hours",
        method: "POST",
        body,
      }),
      invalidatesTags: ["VolunteerHours", "VolunteerShifts"],
    }),

    cancelVolunteerShift: builder.mutation<null, CancelVolunteerHoursArgs>({
      query: (body) => {
        let url = "/volunteers/hours/" + body.hoursId;
        if (body.contactId) {
          url = url + "/" + body.contactId;
        }
        return { url, method: "DELETE" };
      },
      invalidatesTags: ["VolunteerHours", "VolunteerShifts"],
    }),
  }),
});

export const {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
  useSignUpForVolunteerShiftMutation,
  useCancelVolunteerShiftMutation,
  useGetVolunteerQuery,
  useGetHoursQuery,
  useGetHourQuery,
} = volunteerApi;
