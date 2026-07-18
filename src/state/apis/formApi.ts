import { Language } from "../../components/forms/meal-program/types";
import { api } from "../api";
import { CBOReport } from "./mealProgramApi/cboApi";

export type Service = {
  name: string;
  location: string;
  time: string;
  description?: string;
  instructions?: string;
};

interface MealsPlusArgs {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    cbo: string;
    services: Service[];
  };
  name: "MEALS_PLUS";
}

interface CBOReportArgs {
  formData: CBOReport;
  name: "CBO_REPORT";
}

interface VolunteerInterestFormArgs {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    instagramHandle?: string;
    corporate?: string;
    source: string;
    extraInfo?: string;
    employer?: string;
  };
  name: "VOLUNTEER_INTEREST";
}

export interface FavoriteOptions {
  American?: number;
  "Asian Cuisine"?: number;
  Barbecue?: number;
  Italian?: number;
  Mexican?: number;
  Sandwiches?: number;
  "Southern/ Soul"?: number;
}

interface MealSurveyArgsV2 {
  formData: {
    language: "English" | "Spanish";
    age?: string;
    ethnicity?: string;
    zip?: string;
    microwave?: boolean;
    utensils?: boolean;
    numberOfPeople?: string;
    children?: boolean;
    time?: string;
    mealType?: string;
    mealType2?: string;
    dietary?: string[];
    fruit?: boolean;
    taste?: boolean;
    access?: boolean;
    skip?: string;
    fridge?: boolean;
    diabetes?: boolean;
    hbp?: boolean;
  };
  name: "MEAL_SURVEY_V2";
}

interface MealSurveyArgsV3 {
  formData: {
    language: Language;
    age?: string;
    ethnicity?: string;
    preferredLanguage?: string;
    otherPreferredLanguage?: string;
    zip?: string;
    numberOfPeople?: string;
    children?: string;
    homelessness?: string;
    homelessnessOther?: string;
    cookingItems?: string[];
    cookingItemsOther?: string;
    healthConcerns?: string[];
    dietary?: string[];
    dietaryOther?: string;
    fruit?: string;
    favorites?: FavoriteOptions;
    calfresh?: string;
    resources?: string[];
    resourcesOther: string;
    rating?: string;
    skip?: string;
    location?: string[];
    locationOther: string;
    access?: string;
  };
  name: "MEAL_SURVEY_V3";
}

interface CulinaryTrainingArgs {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    internet: boolean;
    description: string;
    source: string;
  };
  name: "CULINARY_TRAINING";
}

interface SNAPSurveyArgs {
  formData: {
    receiveSNAP: boolean;
    november?: boolean;
    whatDay?: string;
    howMuch?: string;
    reduce?: boolean;
  };
  name: "SNAP_SURVEY";
}

interface HomeChefPollArgs {
  formData: {
    city: string;
    miles: string;
    active: boolean;
    support?: string;
  };
  name: "HOME_CHEF_POLL";
}

interface HomeChefOrientationArgs {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  name: "HOME_CHEF_ORIENTATION";
}

export interface BallersRSVPArgs {
  formData: {
    name: string;
    email: string;
    additional: boolean;
    numberOfPeople: string;
    numberOfAdditional: string;
  };
  name: "BALLERS_RSVP";
}

type SubmitFormArgs =
  | CBOReportArgs
  | VolunteerInterestFormArgs
  | CulinaryTrainingArgs
  | MealSurveyArgsV3
  | SNAPSurveyArgs
  | MealsPlusArgs
  | HomeChefPollArgs
  | HomeChefOrientationArgs
  | BallersRSVPArgs;

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

export type RSVP = BallersRSVPArgs["formData"] & { id: string };

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
