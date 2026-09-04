import { api } from "../api";
import {
  NotificationPayload,
  Notification,
  EventConfig,
} from "@community-kitchens/apiinterfaces";

const d4jApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendD4JNotification: builder.mutation<null, NotificationPayload>({
      query: (body) => ({
        url: "/d4j/notifications",
        body,
        method: "POST",
      }),
      invalidatesTags: ["PushNotifications"],
    }),
    getD4JNotifications: builder.query<Notification[], void>({
      query: () => "/d4j/notifications",
      providesTags: ["PushNotifications"],
    }),
    generateDeleteAccountCode: builder.query<null, string>({
      query: (email) => "/d4j/delete-account/" + email,
    }),
    verifyDeleteAccountCode: builder.mutation<
      null,
      { code: string; email: string }
    >({
      query: (body) => ({
        method: "POST",
        url: "/d4j/delete-account",
        body,
      }),
    }),
    confirmEmail: builder.mutation<null, { code: string }>({
      query: (body) => ({ url: "/d4j/confirm-email", method: "POST", body }),
    }),
    deleteAndy: builder.query<null, void>({
      query: () => "/d4j/delete-andy",
    }),
    getStyleWeekActive: builder.query<EventConfig, void>({
      query: () => "/d4j/style-week",
      providesTags: ["D4JConfig"],
    }),
    setStyleWeekActive: builder.mutation<null, EventConfig>({
      query: (body) => ({ url: "/d4j/style-week", method: "POST", body }),
      invalidatesTags: ["D4JConfig"],
    }),
    declareWinner: builder.query<Record<string, number>, void>({
      query: () => "/d4j/contest/winner",
    }),
  }),
});

export const {
  useSendD4JNotificationMutation,
  useGetD4JNotificationsQuery,
  useLazyGenerateDeleteAccountCodeQuery,
  useVerifyDeleteAccountCodeMutation,
  useConfirmEmailMutation,
  useLazyDeleteAndyQuery,
  useGetStyleWeekActiveQuery,
  useSetStyleWeekActiveMutation,
  useDeclareWinnerQuery,
} = d4jApi;
