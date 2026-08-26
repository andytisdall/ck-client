import { api } from "../../../api";
import {
  NotificationPayload,
  Notification,
} from "@community-kitchens/apiinterfaces";

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendHomeChefNotification: builder.mutation<null, NotificationPayload>({
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
  }),
});

export const {
  useGetHomeChefNotificationsQuery,
  useSendHomeChefNotificationMutation,
} = notificationApi;
