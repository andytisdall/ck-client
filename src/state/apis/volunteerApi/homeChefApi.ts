import _ from "lodash";

import { api } from "../../api";
import {
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
  HomeChefQuizQuestion,
  HomeChefQuizAnswer,
  HomeChefQuizResponse,
  SupplyOrderInfo,
  SupplyOrder,
} from "./types";

export const homeChefApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendHomeChefNotification: builder.mutation<null, NotificationArgs>({
      query: (body) => ({
        url: "/home-chef/notifications",
        body,
        method: "POST",
      }),
      invalidatesTags: ["PushNotifications"],
    }),
    getHomeChefNotifications: builder.query<Notification[], void>({
      query: () => "/home-chef/notifications/all",
      providesTags: ["PushNotifications"],
    }),
    getCampaign: builder.query<Campaign, void>({
      query: () => "/home-chef/campaign",
    }),
    getShifts: builder.query<JobShiftsState, void>({
      query: () => "/home-chef/job-listing",
      transformResponse: (response: GetShiftsResponse) => ({
        shifts: _.mapKeys(response.shifts, "id"),
        jobs: response.jobs,
      }),
      providesTags: ["HomeChefShifts"],
    }),
    signUpForHomeChefShift: builder.mutation<
      VolunteerHours,
      SignUpForHomeChefShiftArgs
    >({
      query: (body) => ({
        url: "/home-chef/hours",
        body,
        method: "POST",
      }),
      invalidatesTags: ["HomeChefHours", "HomeChefShifts"],
    }),
    getHomeChefHours: builder.query<VolunteerHoursState, void>({
      query: () => "/home-chef/hours",
      transformResponse: (response: VolunteerHours[]) =>
        _.mapKeys(response, "id"),
      providesTags: ["HomeChefHours"],
    }),
    sendInvite: builder.mutation<null, SendInviteArgs>({
      query: (body) => ({
        url: "home-chef/invite",
        body,
        method: "POST",
      }),
    }),
    editHours: builder.mutation<null, EditHoursArgs>({
      query: ({ id, mealCount, cancel, date, fridge, mealType }) => ({
        url: "/home-chef/hours/" + id,
        method: "PATCH",
        body: { mealCount, cancel, mealType, emailData: { fridge, date } },
      }),
      invalidatesTags: ["HomeChefHours", "HomeChefShifts"],
    }),
    getQuizQuestions: builder.query<HomeChefQuizQuestion[], void>({
      query: () => "/home-chef/quiz",
    }),
    submitQuizAnswers: builder.mutation<
      HomeChefQuizResponse,
      HomeChefQuizAnswer[]
    >({
      query: (body) => ({
        body,
        url: "/home-chef/quiz",
        method: "POST",
      }),
      invalidatesTags: ["UserInfo"],
    }),
    uploadFoodHandlerCertificate: builder.mutation<null, File>({
      query: (file) => {
        const body = new FormData();
        body.append("FH", file);
        return {
          url: "/home-chef/food-handler",
          body,
          formData: true,
          method: "POST",
        };
      },
      invalidatesTags: ["UserInfo"],
    }),
    orderSupplies: builder.mutation<null, SupplyOrderInfo>({
      query: (body) => ({ url: "/home-chef/ordering", body, method: "POST" }),
      invalidatesTags: ["HomeChefSupplies"],
    }),
    getFulfilledSupplyOrders: builder.query<SupplyOrder[], void>({
      query: () => "/home-chef/ordering/fulfilled",
      providesTags: ["HomeChefSupplies"],
    }),
    getUnfulfilledSupplyOrders: builder.query<SupplyOrder[], void>({
      query: () => "/home-chef/ordering/unfulfilled",
      providesTags: ["HomeChefSupplies"],
    }),
    updateSupplyOrders: builder.mutation<null, { orders: string[] }>({
      query: (body) => ({ url: "/home-chef/ordering", method: "PATCH", body }),
      invalidatesTags: ["HomeChefSupplies"],
    }),
    createManualSupplyOrder: builder.mutation<
      null,
      { firstName: string; lastName: string; items: SupplyOrderInfo }
    >({
      query: (body) => ({
        body,
        url: "/home-chef/ordering/manual",
        method: "POST",
      }),
      invalidatesTags: ["HomeChefSupplies"],
    }),
    createDeliverToKitchenShift: builder.mutation<
      { shiftId: string },
      { date: string }
    >({
      query: (body) => ({
        url: "/home-chef/deliver-to-kitchen",
        body,
        method: "POST",
      }),
      invalidatesTags: ["HomeChefShifts"],
    }),
  }),
});

export const {
  useSendHomeChefNotificationMutation,
  useGetCampaignQuery,
  useGetShiftsQuery,
  useSignUpForHomeChefShiftMutation,
  useGetHomeChefHoursQuery,
  useSendInviteMutation,
  useEditHoursMutation,
  useGetHomeChefNotificationsQuery,
  useGetQuizQuestionsQuery,
  useSubmitQuizAnswersMutation,
  useUploadFoodHandlerCertificateMutation,
  useOrderSuppliesMutation,
  useGetFulfilledSupplyOrdersQuery,
  useGetUnfulfilledSupplyOrdersQuery,
  useUpdateSupplyOrdersMutation,
  useCreateManualSupplyOrderMutation,
  useCreateDeliverToKitchenShiftMutation,
} = homeChefApi;
