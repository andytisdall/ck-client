import _ from 'lodash';

import { api } from '../../api';
import {
  Restaurant,
  CreateRestaurantArgs,
  EditRestaurantArgs,
  RestaurantState,
  RestaurantInfo,
} from './types';

export const restaurantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurant: builder.query<Restaurant, void>({
      query: () => '/meal-program/restaurant',
      providesTags: ['Restaurant'],
    }),
    createRestaurant: builder.mutation<Restaurant, CreateRestaurantArgs>({
      query: (body) => ({
        url: '/meal-program/restaurant',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['Restaurant'],
    }),
    editRestaurant: builder.mutation<Restaurant, EditRestaurantArgs>({
      query: (body) => ({
        url: '/meal-program/restaurant',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Restaurant'],
    }),
    getAllRestaurants: builder.query<RestaurantState, void>({
      query: () => '/meal-program/restaurant/all',
      transformResponse: (response: Restaurant[]) => _.mapKeys(response, 'id'),
    }),
    getRestaurantInfo: builder.query<RestaurantInfo, void>({
      query: () => '/meal-program/restaurant/meal-program-info',
      providesTags: ['RestaurantInfo'],
    }),
  }),
});

export const {
  useGetRestaurantQuery,
  useCreateRestaurantMutation,
  useEditRestaurantMutation,
  useGetAllRestaurantsQuery,
  useGetRestaurantInfoQuery,
} = restaurantApi;
