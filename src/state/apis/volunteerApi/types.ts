import { CarSize } from "./driver";

export type Campaign = {
  mealsDonated: number;
};

export interface Shift {
  id: string;
  startTime: string;
  open: boolean;
  job: string;
  restaurantMeals?: boolean;
  duration: number;
  endTime: string;
  slots: number;
}

export type FridgeRegion =
  | "East Oakland"
  | "West Oakland"
  | "Berkeley"
  | "CK Kitchen";

export interface Job {
  id: string;
  name: string;
  location?: string;
  locationInfo?: string;
  locationCity?: string;
  shifts: Shift[];
  active: boolean;
  ongoing: boolean;
  description?: string;
  campaign: string;
  region?: FridgeRegion;
  notes?: string;
  carSizeRequired?: CarSize;
  destination?: string;
  dropoffNotes?: string;
  // distance?: string;
}

export interface GetShiftsResponse {
  jobs: Job[];
  shifts: Shift[];
}

export interface VolunteerCampaign {
  name: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  id: string;
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
