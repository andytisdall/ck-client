import { api } from '../../api';
import {
  Fridge,
  HomeChefNotificationArgs,
  Campaign,
  JobShiftsState,
  SignUpForShiftArgs,
  VolunteerHours,
} from './types';

export const homeChefApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFridges: builder.query<Fridge[], void>({
      query: () => '/home-chef/campaign/fridges',
    }),
    sendHomeChefNotification: builder.mutation<null, HomeChefNotificationArgs>({
      query: (body) => ({
        url: '/home-chef/notifications',
        body,
        method: 'POST',
      }),
    }),
    getCampaign: builder.query<Campaign, void>({
      query: () => '/home-chef/campaign',
    }),
    getShifts: builder.query<JobShiftsState, void>({
      query: () => '/home-chef/job-listing',
    }),
    signUpForShift: builder.mutation<VolunteerHours, SignUpForShiftArgs>({
      query: (body) => ({
        url: '/home-chef/hours',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetFridgesQuery,
  useSendHomeChefNotificationMutation,
  useGetCampaignQuery,
  useGetShiftsQuery,
  useSignUpForShiftMutation,
} = homeChefApi;
