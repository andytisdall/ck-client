import { Job, Shift, VolunteerHours } from "../types";

export interface AppNotification {
  payload: { title: string; body: string };
  app: string;
  date: string;
  id: string;
}

export interface NewAppNotificationArgs {
  title: string;
  message: string;
  screen?: string;
  subScreen?: string;
  params?: Record<string, string>;
}

export interface HomeChefJob extends Omit<Job, "shifts"> {
  shifts: string[];
}

export interface JobShiftsState {
  shifts: Record<string, Shift>;
  jobs: Job[];
}

export interface SignUpForHomeChefShiftArgs {
  shiftId: string;
  mealCount: string;
  jobId: string;
  date: string;
  soup: boolean;
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

export type EditRecipeArgs = CreateRecipeArgs & { id: string };

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

export interface SupplyOrderInfo {
  containers: number;
  labels: number;
  soup: number;
  sandwich: number;
}

export interface SupplyOrder {
  items: SupplyOrderInfo;
  date: string;
  fulfilled: boolean;
  contact: { firstName: string; lastName: string; email: string };
  id: string;
}

export type VolunteerHoursState = Record<string, VolunteerHours>;

export interface SendInviteArgs {
  recipients: string[];
  message: string;
  subject: string;
}
