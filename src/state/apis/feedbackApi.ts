import { api } from "../api";
import { Region } from "./textApi";

export interface FeedbackResponse {
    message: string,
    date: string,
    sender: string,
    region: Region,
    read: boolean,
    images: string[],
    response: {date: string, message: string}[],
    id: string
}

const feedbackApi = api.injectEndpoints({
  endpoints: builder => ({
    getFeedback: builder.query<FeedbackResponse[], void>({
      query: () => ({url: '/text/feedback'}),
      providesTags: ['Feedback']
    }),
    deleteFeedback: builder.mutation<null, string>({
      query: id => ({url: '/text/feedback/' + id, method: 'DELETE'}),
      invalidatesTags: ['Feedback']
    })
  })
})

export const { useGetFeedbackQuery, useDeleteFeedbackMutation} = feedbackApi;