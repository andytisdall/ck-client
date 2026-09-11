import _ from "lodash";

import { api } from "../../../api";
import {
  GetShiftsResponse,
  CreateVolunteerHoursArgs,
  VolunteerHours,
  EditHoursArgs,
  VolunteerShift,
  Job,
} from "@community-kitchens/apiinterfaces";

export interface JobShiftsState {
  shifts: Record<string, VolunteerShift>;
  jobs: Job[];
}

export type VolunteerHoursState = Record<string, VolunteerHours>;

export const signupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShifts: builder.query<JobShiftsState, void>({
      query: () => "/home-chef/job-listing",
      transformResponse: (response: GetShiftsResponse) => ({
        shifts: _.mapKeys(response.shifts, "id"),
        jobs: response.jobs,
      }),
      providesTags: ["HomeChefShifts"],
    }),
    signUpForHomeChefShift: builder.mutation<
      VolunteerHours,
      CreateVolunteerHoursArgs
    >({
      query: (body) => ({
        url: "/home-chef/hours",
        body,
        method: "POST",
      }),
      invalidatesTags: ["HomeChefHours", "HomeChefShifts"],
    }),
    getHomeChefHours: builder.query<VolunteerHoursState, void>({
      query: () => "/home-chef/hours",
      transformResponse: (response: VolunteerHours[]) =>
        _.mapKeys(response, "id"),
      providesTags: ["HomeChefHours"],
    }),
    editHours: builder.mutation<null, EditHoursArgs>({
      query: ({ id, mealCount, cancel, date, fridge, mealType }) => ({
        url: "/home-chef/hours/" + id,
        method: "PATCH",
        body: { mealCount, cancel, mealType, emailData: { fridge, date } },
      }),
      invalidatesTags: ["HomeChefHours", "HomeChefShifts"],
    }),
  }),
});

export const {
  useGetShiftsQuery,
  useSignUpForHomeChefShiftMutation,
  useGetHomeChefHoursQuery,
  useEditHoursMutation,
} = signupApi;
