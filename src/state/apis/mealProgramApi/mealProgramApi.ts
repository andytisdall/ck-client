import _ from "lodash";

import { api } from "../../api";

const mealProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTotalMeals: builder.query<{ total: number }, void>({
      query: () => "/meal-program/campaign",
    }),
  }),
});

export const { useGetTotalMealsQuery } = mealProgramApi;
