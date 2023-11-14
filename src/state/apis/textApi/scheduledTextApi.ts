import {api} from '../../api'

import { MessageInstance, TextRecord, GetTextRecordsArgs } from './types';

export const scheduledTextApi = api.injectEndpoints({
  endpoints: (builder) => ({

getScheduledTexts: builder.query<MessageInstance[], void>({
  query: () => ({
    url: '/text/scheduled'
  }),
  providesTags: ['ScheduledText']
}),

deleteScheduledText: builder.mutation<null, string[]>({
  query: (body) => ({
    url: '/text/scheduled/delete', body
  }), invalidatesTags: ['ScheduledText']
}),

getTextRecords: builder.query<TextRecord[], GetTextRecordsArgs>({
  query: ({startDate}) => ({
url: '/text/text-records/list/' + startDate
  })
})
}),
});

export const { useGetScheduledTextsQuery, useDeleteScheduledTextMutation, useGetTextRecordsQuery} = scheduledTextApi