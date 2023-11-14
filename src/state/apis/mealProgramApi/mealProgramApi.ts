import _ from 'lodash';

import { api } from '../../api';
import { MealProgramState, MealProgramScheduleResponse } from './types';

const mealProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMealProgramSchedule: builder.query<MealProgramState, void>({
      query: () => '/meal-program/schedule',
      transformResponse: (response: MealProgramScheduleResponse) => {
        return {
          accounts: _.mapKeys(response.accounts, 'id'),
          deliveries: response.deliveries,
        };
      },
    }),
  }),
});

export const { useGetMealProgramScheduleQuery } = mealProgramApi;
