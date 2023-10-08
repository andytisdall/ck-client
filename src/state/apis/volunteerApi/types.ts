export type Fridge = {
  name: string;
  address: string;
  region: 'WEST_OAKLAND' | 'EAST_OAKLAND';
};

export type Campaign = {
  mealsDonated: number;
};

export interface HomeChefNotificationArgs {
  title: string;
  message: string;
}

export interface Shift {
  id: string;
  startTime: string;
  open: boolean;
  job: string;
  restaurantMeals: boolean;
  duration: number;
  slots: number;
}

export interface Job {
  id: string;
  name: string;
  location: string;
  shifts: string[];
  active: boolean;
  ongoing: boolean;
  description: string;
  campaign: string;
}

export interface JobShiftsState {
  shifts: Record<string, Shift>;
  jobs: Job[];
}

export interface GetShiftsResponse {
  jobs: Job[];
  shifts: Shift[];
}

export interface EventCampaign {
  jobs: Job[];
  shifts: Shift[];
  name: string;
  date: string;
  description: string;
  id: string;
}

export interface VolunteerHours {
  id: string;
  mealCount: string;
  time: string;
  job: string;
  status: string;
  shift: string;
  campaign?: string;
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
}

export interface SignUpForVolunteerShiftArgs {
  shiftId: string;
  jobId: string;
  date: string;
  contactSalesforceId?: string;
}
