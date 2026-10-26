import _ from "lodash";

import { api } from "../../api";

const mealProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTotalMeals: builder.query<{ total: number }, void>({
      query: () => "/meal-program/campaign",
    }),
    deleteCampaignMembers: builder.query<null, void>({
      query: () => "/meal-program/campaign-members",
    }),
  }),
});

export const { useGetTotalMealsQuery, useDeleteCampaignMembersQuery } =
  mealProgramApi;
