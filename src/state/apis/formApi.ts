import { api } from "../api";

import { RSVP, SubmitFormArgs } from "@community-kitchens/apiinterfaces";

const urls = {
  VOLUNTEER_INTEREST: "/volunteers/signup",
  CBO_REPORT: "/meal-program/cbo",
  MEAL_SURVEY_V3: "/meal-program/survey",
  CULINARY_TRAINING: "/meal-program/workforce-development",
  SNAP_SURVEY: "/meal-program/survey/snap",
  MEALS_PLUS: "/meal-program/meals-plus",
  HOME_CHEF_POLL: "/home-chef/poll",
  HOME_CHEF_ORIENTATION: "/home-chef/orientation",
  BALLERS_RSVP: "/events/rsvp",
};

const formApi = api.injectEndpoints({
  endpoints: (builder) => ({
    submitForm: builder.mutation<null, SubmitFormArgs>({
      query: ({ formData, name }) => ({
        url: urls[name],
        body: formData,
        method: "POST",
      }),
    }),
    getRSVPs: builder.query<RSVP[], void>({
      query: () => "/events/rsvp",
      providesTags: ["RSVP"],
    }),
    deleteRSVP: builder.mutation<null, string>({
      query: (id) => ({ url: "/events/rsvp/" + id, method: "DELETE" }),
      invalidatesTags: ["RSVP"],
    }),
    editRSVP: builder.mutation<null, RSVP>({
      query: (body) => ({
        url: "/events/rsvp",
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["RSVP"],
    }),
  }),
});

export const {
  useSubmitFormMutation,
  useGetRSVPsQuery,
  useDeleteRSVPMutation,
  useEditRSVPMutation,
} = formApi;
