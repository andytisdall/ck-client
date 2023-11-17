import { utcToZonedTime, format } from 'date-fns-tz';

import { api } from '../../api';

import {
  MessageInstance,
  ScheduledTextState,
  TextRecord,
  GetTextRecordsArgs,
} from './types';

export const scheduledTextApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getScheduledTexts: builder.query<ScheduledTextState, void>({
      query: () => ({
        url: '/text/scheduled',
      }),
      providesTags: ['ScheduledText'],
      transformResponse: (res: MessageInstance[]) => {
        const state: ScheduledTextState = {};
        res.forEach((message) => {
          const formattedTime = format(
            utcToZonedTime(message.dateCreated, 'America/Los_Angeles'),
            'M/d/yy hh:mm'
          );
          const messageKey = formattedTime + message.body;
          if (state[messageKey]) {
            state[messageKey].push(message);
          } else {
            state[messageKey] = [message];
          }
        });
        return state;
      },
    }),

    deleteScheduledText: builder.mutation<null, string[]>({
      query: (body) => ({
        url: '/text/scheduled/delete',
        body,
      }),
      invalidatesTags: ['ScheduledText'],
    }),

    getTextRecords: builder.query<TextRecord[], GetTextRecordsArgs>({
      query: ({ startDate }) => ({
        url: '/text/text-records/list/' + startDate,
      }),
    }),
  }),
});

export const {
  useGetScheduledTextsQuery,
  useDeleteScheduledTextMutation,
  useGetTextRecordsQuery,
} = scheduledTextApi;
