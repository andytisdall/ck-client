export type Campaign = {
  mealsDonated: number;
};

export interface NotificationArgs {
  title: string;
  message: string;
  screen?: string;
  subScreen?: string;
  params?: Record<string, string>;
}

export interface Notification {
  payload: { title: string; body: string };
  app: string;
  date: string;
  id: string;
}

export interface Shift {
  id: string;
  startTime: string;
  open: boolean;
  job: string;
  restaurantMeals?: boolean;
  duration: number;
  slots: number;
}

export interface Job {
  id: string;
  name: string;
  location?: string;
  shifts: string[];
  active: boolean;
  ongoing: boolean;
  description?: string;
  campaign: string;
  region?: "East Oakland" | "West Oakland";
  notes?: string;
}

export interface JobShiftsState {
  shifts: Record<string, Shift>;
  jobs: Job[];
}

export interface GetShiftsResponse {
  jobs: Job[];
  shifts: Shift[];
}

export interface VolunteerCampaign {
  jobs: Job[];
  shifts: Shift[];
  name: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  id: string;
  buttonText?: string;
}

export interface VolunteerHours {
  id: string;
  mealCount?: string;
  time: string;
  job: string;
  status: string;
  shift: string;
  campaign?: string;
  mealType?: "Entree" | "Soup";
}

export type VolunteerHoursState = Record<string, VolunteerHours>;

export interface SignUpForHomeChefShiftArgs {
  shiftId: string;
  mealCount: string;
  jobId: string;
  date: string;
  soup: boolean;
}

export interface SendInviteArgs {
  recipients: string[];
  message: string;
  subject: string;
}

export interface EditHoursArgs {
  id: string;
  mealCount: string;
  cancel: boolean;
  date: string;
  fridge: string;
  mealType: "Soup" | "Entree";
}

export interface SignUpForVolunteerShiftArgs {
  shiftId: string;
  jobId: string;
  date: string;
  contactSalesforceId?: string;
}

export interface RecipeItem {
  header: string;
  text: string[];
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeItem[];
  instructions: RecipeItem[];
  category: string;
  description: string[] | string;
  image: string;
  author: string;
}

export type RecipeState = Record<string, Recipe>;

export interface CreateRecipeArgs {
  name: string;
  ingredients: string;
  instructions: string;
  description: string;
  category: string;
  photo?: File;
  author?: string;
}

export type EditRecipeArgs = CreateRecipeArgs & { id: string };

export interface Volunteer {
  householdId: string;
  name?: string;
  id: string;
  portalUsername?: string;
  firstName?: string;
  volunteerAgreement: boolean;
  email: string;
}

export interface CreateVolunteerArgs {
  email: string;
  firstName: string;
  lastName: string;
}

export interface CancelVolunteerHoursArgs {
  hoursId: string;
  contactId?: string;
}

export interface GetVolunteerHoursArgs {
  campaignId: string;
  contactId: string;
}

export interface HomeChefQuizQuestion {
  question: string;
  answers: string[];
}

export interface HomeChefQuizAnswer {
  index: number;
  answer: number;
}

export interface HomeChefQuizResponse {
  passed: boolean;
  score: number;
  wrongAnswers: number[];
  rightAnswers?: string[];
}
