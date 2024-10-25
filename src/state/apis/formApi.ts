import { api } from '../api';

interface CBOReportArgs {
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

interface VolunteerInterestFormArgs {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  instagramHandle?: string;
  foodHandler?: boolean;
  foodHandlerOther?: string;
  experience?: string;
  transport?: boolean;
  transportOther?: string;
  workOnFeet?: boolean;
  workOnFeetOther?: string;
  source: string;
  extraInfo?: string;
  programs: {
    ckKitchen: boolean;
    ckHomeChefs: boolean;
    corporate: boolean;
    other: string;
  };
}

interface HomeChefRegistrationArgs {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  source: string;
}

interface SubmitFormArgs {
  formData:
    | CBOReportArgs
    | TextSignUpSurveyArgs
    | MealQualitySurveyArgs
    | MealProgramIntakeArgs
    | VolunteerInterestFormArgs
    | HomeChefRegistrationArgs;

  name: keyof typeof urls;
}

const urls = {
  MEAL_SURVEY: '/text/meal-survey',
  VOLUNTEER_INTEREST_OLD: '/volunteers/signup',
  TEXT_SIGNUP_SURVEY: '/text/signup-survey',
  MEAL_PROGRAM_INTAKE: '/meal-program/intake-survey',
  CBO_REPORT: '/meal-program/cbo-report',
  HOME_CHEF_REGISTRATION: '/home-chef/home-chef-registration',
  COOKIE_PARTY: '/volunteers/hours/cookies',
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
