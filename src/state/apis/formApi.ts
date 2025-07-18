import { api } from "../api";

interface CBOReportArgs {
  formData: {
    month: string;
    name: string;
    CBOName: string;
    performanceMeasures: Record<string, string>;
    age: Record<string, string>;
    race: Record<string, string>;
    individuals?: string;
    households?: string;
    zips: Record<string, string>;
    feedback?: string;
    phone?: string;
    email: string;
    year: string;
    waters: string;
    juices: string;
    socks: string;
    granolaBars: string;
    tortillaChips: string;
    extraItem: string;
    extraItemAmount: string;
  };
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
  };
  name: "VOLUNTEER_INTEREST";
}

interface NewMealSurveyArgs {
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
  name: "NEW_MEAL_SURVEY";
}

interface BikeSignupArgs {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
  };
  name: "BIKE_SIGNUP";
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

type SubmitFormArgs =
  | CBOReportArgs
  | VolunteerInterestFormArgs
  | CulinaryTrainingArgs
  | NewMealSurveyArgs
  | BikeSignupArgs;

const urls = {
  VOLUNTEER_INTEREST: "/volunteers/signup",
  CBO_REPORT: "/meal-program/cbo-report",
  NEW_MEAL_SURVEY: "/meal-program/survey",
  BIKE_SIGNUP: "/volunteers/bike",
  CULINARY_TRAINING: "/meal-program/workforce-development",
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
  }),
});

export const { useSubmitFormMutation } = formApi;
