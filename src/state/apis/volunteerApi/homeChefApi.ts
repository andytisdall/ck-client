import _ from 'lodash';

import { api } from '../../api';
import {
  Fridge,
  NotificationArgs,
  Campaign,
  JobShiftsState,
  SignUpForHomeChefShiftArgs,
  VolunteerHours,
  VolunteerHoursState,
  GetShiftsResponse,
  SendInviteArgs,
  EditHoursArgs,
  Notification,
} from './types';

export const homeChefApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFridges: builder.query<Fridge[], void>({
      query: () => '/home-chef/campaign/fridges',
    }),
    sendHomeChefNotification: builder.mutation<null, NotificationArgs>({
      query: (body) => ({
        url: '/home-chef/notifications',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['PushNotifications'],
    }),
    getHomeChefNotifications: builder.query<Notification[], void>({
      query: () => '/home-chef/notifications',
      providesTags: ['PushNotifications'],
    }),
    getCampaign: builder.query<Campaign, void>({
      query: () => '/home-chef/campaign',
    }),
    getShifts: builder.query<JobShiftsState, void>({
      query: () => '/home-chef/job-listing',
      transformResponse: (response: GetShiftsResponse) => ({
        shifts: _.mapKeys(response.shifts, 'id'),
        jobs: response.jobs,
      }),
      providesTags: ['HomeChefShifts'],
    }),
    signUpForHomeChefShift: builder.mutation<
      VolunteerHours,
      SignUpForHomeChefShiftArgs
    >({
      query: (body) => ({
        url: '/home-chef/hours',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['HomeChefHours', 'HomeChefShifts'],
    }),
    getHomeChefHours: builder.query<VolunteerHoursState, void>({
      query: () => '/home-chef/hours',
      transformResponse: (response: VolunteerHours[]) =>
        _.mapKeys(response, 'id'),
      providesTags: ['HomeChefHours'],
    }),
    sendInvite: builder.mutation<null, SendInviteArgs>({
      query: (body) => ({
        url: 'home-chef/invite',
        body,
        method: 'POST',
      }),
    }),
    editHours: builder.mutation<null, EditHoursArgs>({
      query: ({ id, mealCount, cancel, date, fridge }) => ({
        url: '/home-chef/hours/' + id,
        method: 'PATCH',
        body: { mealCount, cancel, emailData: { fridge, date } },
      }),
      invalidatesTags: ['HomeChefHours'],
    }),
  }),
});

export const {
  useGetFridgesQuery,
  useSendHomeChefNotificationMutation,
  useGetCampaignQuery,
  useGetShiftsQuery,
  useSignUpForHomeChefShiftMutation,
  useGetHomeChefHoursQuery,
  useSendInviteMutation,
  useEditHoursMutation,
  useGetHomeChefNotificationsQuery,
} = homeChefApi;
