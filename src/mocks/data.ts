import { addDays, formatISO } from 'date-fns';
import { Restaurant, RestaurantInfo } from '../state/apis/mealProgramApi';
import { User, ContactInfo } from '../state/apis/authApi';
import {
  Shift,
  Job,
  VolunteerHours,
  Campaign,
  GetShiftsResponse,
  CreateVolunteerResponse,
  VolunteerCampaign,
} from '../state/apis/volunteerApi';

export const user1: User = {
  username: 'bojee',
  id: 'failjrse48jf48',
  admin: true,
  salesforceId: 'f4s9jf4s9j',
  active: true,
};

export const user2: User = {
  username: 'chompy',
  id: '48yrf848fy48',
  admin: false,
  salesforceId: 'd093900',
  active: true,
};

export const userInfo1: ContactInfo = {
  firstName: 'Testy',
  lastName: 'Testorici',
  volunteerAgreement: true,
  foodHandler: true,
  homeChefStatus: 'Active',
  homeChefQuizPassed: true,
  ckKitchenStatus: 'Active',
};

export const userInfo2: ContactInfo = {
  firstName: 'Testy',
  lastName: 'Testorici',
  volunteerAgreement: false,
  foodHandler: true,
  homeChefStatus: 'Attended Orientation',
  homeChefQuizPassed: false,
};

export const restaurant1: Restaurant = {
  name: "Guigino's",
  id: 'hi7h7gh7gh',
  salesforceId: 'khi8h',
  user: user1.id,
};

export const uploadFileRes = {
  title: 'file',
  description: 'this is a file',
  folder: 'folder',
  docType: 'HC',
};

export const restaurantInfo2 = {
  remainingDocs: [uploadFileRes],
  completedDocs: ['W9'],
  status: 'Active',
  healthPermitExpired: false,
};

export const restaurantInfo1: RestaurantInfo = {
  status: 'Active',
  healthPermitExpired: false,
  remainingDocs: [],
  completedDocs: [],
};

export const campaign: Campaign = {
  mealsDonated: 100,
};

export const job1: Job = {
  id: '7777',
  name: 'City Slicker Farms',
  shifts: ['1111', '2222'],
  active: true,
  location: 'Location',
  ongoing: true,
  description: 'kh',
  campaign: 'wslejfn',
};

export const shift1: Shift = {
  id: job1.shifts[0],
  startTime: formatISO(addDays(new Date(), 1)),
  open: true,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 3,
};

export const shift2: Shift = {
  id: job1.shifts[1],
  startTime: formatISO(addDays(new Date(), 2)),
  open: true,
  job: job1.id,
  restaurantMeals: false,
  duration: 3,
  slots: 3,
};

export const hours1: VolunteerHours = {
  id: 'd38ih3d',
  mealCount: '25',
  time: shift1.startTime,
  job: job1.id,
  status: 'Confirmed',
  shift: shift1.id,
};

export const hours2: VolunteerHours = {
  id: '7tt7999',
  mealCount: '30',
  time: shift2.startTime,
  job: job1.id,
  status: 'Confirmed',
  shift: shift2.id,
};

export const jobs: GetShiftsResponse = {
  jobs: [job1],
  shifts: [shift1, shift2],
};

export const homeChefHoursResponse = [hours1];

export const userResponse = [user1];

export const volunteer1 = {
  id: '0037400000FU7XrAAL',
  householdId: '0017400000IG2QzAAL',
  portalUsername: null,
  firstName: 'Andrew',
  name: 'Andrew Tisdall',
  lastName: 'Tisdall',
  ckKitchenStatus: 'Active',
};

export const volunteer2 = {
  id: '0037400000FU7XrAAL',
  householdId: '0017400000IG2QzAAL',
  portalUsername: null,
  firstName: 'Andrew',
  name: 'Andrew Tisdall',
  lastName: 'Tisdall',
  ckKitchenStatus: undefined,
};

export const newVolunteer: CreateVolunteerResponse = {
  name: 'Andrew Tisdall',
  email: 'andrew.tisdall@gmail.com',
  householdId: '0017400000IG2QzAAL',
  id: '0037400000FU7XrAAL',
};

export const ckKitchenCampaign: VolunteerCampaign = {
  name: 'CK Kitchen Volunteers',
  id: 'dewneic',
  jobs: [job1],
  shifts: [shift1, shift2],
};

export const eventCampaign: VolunteerCampaign = {
  name: 'Holiday Cookies',
  id: 'dw3h87hd8',
  jobs: [job1],
  shifts: [shift1, shift2],
  buttonText: 'dkuhewd',
};
