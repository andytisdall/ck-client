import { api } from '../api';

interface CBOReportArgs {
  month: string;
  name: string;
  CBOName: string;
  performanceMeasures: Record<string, string>;
  age: Record<string, string>;
  race: Record<string, string>;
  households?: string;
  zips: Record<string, string>;
  feedback?: string;
  phone?: string;
  email: string;
  year: string;
}

interface MealQualitySurveyArgs {
  mealName?: string;
  location?: string;
  taste?: string;
  size?: string;
  type?: string;
  ingredients?: string;
  days?: string;
  phone?: string;
}

interface TextSignUpSurveyArgs {
  age?: string;
  ethnicity?: string;
  zip?: string;
  type?: string;
  ingredients?: string;
  days?: string;
  phone?: string;
}

interface MealProgramIntakeArgs {
  name: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  contactPosition: string;
  bipoc: boolean;
  female: boolean;
  address: string;
  date: string;
  neighborhood: string;
  hardship: boolean;
  ebt: boolean;
  deliver: boolean;
  source: string;
  food: String;
}

interface HCInterestFormArgs {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  instagramHandle?: string;
  commit?: boolean;
  foodHandler?: boolean;
  daysAvailable?: Record<string, boolean>;
  experience?: string;
  pickup?: boolean;
  source: string;
  extraInfo?: string;
  otherExperience?: string;
  foodHandlerOther?: string;
  pickupMaybe: boolean;
  programs: { ckKitchen: boolean; ckHomeChefs: boolean; other: string };
}

interface SubmitFormArgs {
  formData:
    | CBOReportArgs
    | TextSignUpSurveyArgs
    | MealQualitySurveyArgs
    | MealProgramIntakeArgs
    | HCInterestFormArgs;
  name: string;
}

const urls: Record<string, string> = {
  MEAL_SURVEY: '/text/meal-survey',
  VOLUNTEER_INTEREST: '/volunteers/signup',
  TEXT_SIGNUP_SURVEY: '/text/signup-survey',
  MEAL_PROGRAM_INTAKE: '/meal-program/intake-survey',
  CBO_REPORT: '/meal-program/cbo-report',
};

const formApi = api.injectEndpoints({
  endpoints: (builder) => ({
    submitForm: builder.mutation<null, SubmitFormArgs>({
      query: ({ formData, name }) => ({
        url: urls[name],
        body: formData,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSubmitFormMutation } = formApi;
