import { api } from "../../../api";
import {
  HomeChefQuizAnswer,
  HomeChefQuizResponse,
  HomeChefQuizQuestion,
} from "./types";

export const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetQuizQuestionsQuery, useSubmitQuizAnswersMutation } =
  quizApi;
