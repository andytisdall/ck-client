import { api } from '../api';
import { NotificationArgs } from './volunteerApi';
import { Notification } from './volunteerApi';

interface PrizeDrawingResponse {
  contact: Winner;
  numberOfCheckIns: number;
}

interface Winner {
  id: string;
  firstName?: string;
  lastName: string;
}

const d4jApi = api.injectEndpoints({
  endpoints: (builder) => ({
    drawPrize: builder.mutation<PrizeDrawingResponse, void>({
      query: () => ({
        url: '/d4j/rewards/prize-drawing',
        method: 'POST',
      }),
    }),
    sendD4JNotification: builder.mutation<null, NotificationArgs>({
      query: (body) => ({
        url: '/d4j/notifications',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['PushNotifications'],
    }),
    getD4JNotifications: builder.query<Notification[], void>({
      query: () => '/d4j/notifications',
      providesTags: ['PushNotifications'],
    }),
    generateDeleteAccountCode: builder.query<null, string>({
      query: (email) => '/user/delete-account/' + email,
    }),
    verifyDeleteAccountCode: builder.mutation<null, string>({
      query: (code) => ({
        method: 'POST',
        url: '/user/delete-account',
        body: { code },
      }),
    }),
  }),
});

export const {
  useSendD4JNotificationMutation,
  useGetD4JNotificationsQuery,
  useDrawPrizeMutation,
  useGenerateDeleteAccountCodeQuery,
  useVerifyDeleteAccountCodeMutation,
} = d4jApi;
