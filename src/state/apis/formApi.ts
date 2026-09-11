import {
  CBOReport,
  MealSurveyArgsV3,
  VolunteerInterestFormArgs,
  CulinaryTrainingArgs,
} from "@community-kitchens/apiinterfaces";
import { api } from "../api";

const formApi = api.injectEndpoints({
  endpoints: (builder) => ({
    submitVolunteerForm: builder.mutation<null, VolunteerInterestFormArgs>({
      query: (body) => ({ url: "/volunteers/signup", method: "POST", body }),
    }),
    submitCboReport: builder.mutation<null, CBOReport>({
      query: (body) => ({ url: "/meal-program/cbo", method: "POST", body }),
    }),
    submitMealSurvey: builder.mutation<null, MealSurveyArgsV3>({
      query: (body) => ({ url: "/meal-program/survey", method: "POST", body }),
    }),
    submitCulinaryTrainingApplication: builder.mutation<
      null,
      CulinaryTrainingArgs
    >({
      query: (body) => ({
        url: "/meal-program/workforce-development",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSubmitVolunteerFormMutation,
  useSubmitCboReportMutation,
  useSubmitCulinaryTrainingApplicationMutation,
  useSubmitMealSurveyMutation,
} = formApi;
