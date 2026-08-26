import _ from "lodash";
import { Region } from "@community-kitchens/apiinterfaces";

import { api } from "../../api";

export interface FeedbackResponse {
  message: string;
  date: string;
  sender: string;
  region: Region;
  read: boolean;
  images: string[];
  response: { date: string; message: string }[];
  id: string;
}

export type FeedbackState = Record<string, FeedbackResponse>;

const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query<FeedbackState, string>({
      query: (daysBack) => ({ url: "/text/feedback/" + daysBack }),
      providesTags: ["Feedback"],
      transformResponse: (response: FeedbackResponse[]) =>
        _.mapKeys(response, "id"),
    }),
    deleteFeedback: builder.mutation<null, string>({
      query: (id) => ({ url: "/text/feedback/" + id, method: "DELETE" }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const { useGetFeedbackQuery, useDeleteFeedbackMutation } = feedbackApi;
