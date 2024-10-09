import { api } from '../api';
import { NotificationArgs } from './volunteerApi';
import { Notification } from './volunteerApi';

interface PrizeDrawingResponse {
  firstPrize: Winner;
  secondPrize: Winner;
  thirdPrize: Winner;
  numberOfCheckIns: number;
}

interface Winner {
  id: string;
  firstName?: string;
  lastName: string;
}

interface EventConfig {
  contestActive: boolean;
  styleMonthActive: boolean;
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
      query: (email) => '/d4j/delete-account/' + email,
    }),
    verifyDeleteAccountCode: builder.mutation<
      null,
      { code: string; email: string }
    >({
      query: (body) => ({
        method: 'POST',
        url: '/d4j/delete-account',
        body,
      }),
    }),
    confirmEmail: builder.mutation<null, { code: string }>({
      query: (body) => ({ url: '/d4j/confirm-email', method: 'POST', body }),
    }),
    deleteAndy: builder.query<null, void>({
      query: () => '/d4j/delete-andy',
    }),
    getStyleWeekActive: builder.query<EventConfig, void>({
      query: () => '/d4j/style-week',
      providesTags: ['D4JConfig'],
    }),
    setStyleWeekActive: builder.mutation<null, EventConfig>({
      query: (body) => ({ url: '/d4j/style-week', method: 'POST', body }),
      invalidatesTags: ['D4JConfig'],
    }),
    declareWinner: builder.mutation<string[], void>({
      query: () => ({ url: '/d4j/contest/winner', method: 'POST' }),
    }),
  }),
});

export const {
  useSendD4JNotificationMutation,
  useGetD4JNotificationsQuery,
  useDrawPrizeMutation,
  useLazyGenerateDeleteAccountCodeQuery,
  useVerifyDeleteAccountCodeMutation,
  useConfirmEmailMutation,
  useLazyDeleteAndyQuery,
  useGetStyleWeekActiveQuery,
  useSetStyleWeekActiveMutation,
  useDeclareWinnerMutation,
} = d4jApi;
