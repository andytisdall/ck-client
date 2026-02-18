import { api } from "../../../api";
import { NewAppNotificationArgs, AppNotification } from "./types";

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendHomeChefNotification: builder.mutation<null, NewAppNotificationArgs>({
      query: (body) => ({
        url: "/home-chef/notifications",
        body,
        method: "POST",
      }),
      invalidatesTags: ["PushNotifications"],
    }),
    getHomeChefNotifications: builder.query<AppNotification[], void>({
      query: () => "/home-chef/notifications/all",
      providesTags: ["PushNotifications"],
    }),
  }),
});

export const {
  useGetHomeChefNotificationsQuery,
  useSendHomeChefNotificationMutation,
} = notificationApi;
