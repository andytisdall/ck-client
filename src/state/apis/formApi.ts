import { api } from '../api';

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
  name: 'CBO_REPORT';
}

interface MealQualitySurveyArgs {
  formData: {
    mealName?: string;
    location?: string;
    taste?: string;
    size?: string;
    type?: string;
    ingredients?: string;
    days?: string;
    phone?: string;
  };
  name: 'MEAL_SURVEY';
}

interface TextSignUpSurveyArgs {
  formData: {
    age?: string;
    ethnicity?: string;
    zip?: string;
    type?: string;
    ingredients?: string;
    days?: string;
    phone?: string;
  };
  name: 'TEXT_SIGNUP_SURVEY';
}

interface MealProgramIntakeArgs {
  formData: {
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
  };
  name: 'MEAL_PROGRAM_INTAKE';
}

interface VolunteerInterestFormArgs {
  formData: {
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
  };
  name: 'VOLUNTEER_INTEREST';
}

interface HomeChefRegistrationArgs {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    source: string;
  };
  name: 'HOME_CHEF_REGISTRATION';
}

interface NewMealSurveyArgs {
  formData: {
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
  };
  name: 'NEW_MEAL_SURVEY';
}

type SubmitFormArgs =
  | CBOReportArgs
  | TextSignUpSurveyArgs
  | MealQualitySurveyArgs
  | MealProgramIntakeArgs
  | VolunteerInterestFormArgs
  | HomeChefRegistrationArgs
  | NewMealSurveyArgs;

const urls = {
  MEAL_SURVEY: '/text/meal-survey',
  VOLUNTEER_INTEREST: '/volunteers/signup',
  TEXT_SIGNUP_SURVEY: '/text/signup-survey',
  MEAL_PROGRAM_INTAKE: '/meal-program/intake-survey',
  CBO_REPORT: '/meal-program/cbo-report',
  HOME_CHEF_REGISTRATION: '/home-chef/home-chef-registration',
  NEW_MEAL_SURVEY: '/meal-program/survey',
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
