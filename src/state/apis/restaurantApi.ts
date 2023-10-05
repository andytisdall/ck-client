import _ from 'lodash'

import { api } from '../api';

interface Restaurant { name: string, salesforceId: string, user: string, id: string };
type RestaurantState = Record<string, Restaurant>
interface CreateRestaurantArgs {
  name: string, salesforceId: string, userId: string 
}
type EditRestaurantArgs = CreateRestaurantArgs & {restaurantId: string}

export const restaurantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurant: builder.query<Restaurant, void>({
      query: () => 'meal-program/restaurant',
    }),
    createRestaurant: builder.mutation<Restaurant, CreateRestaurantArgs>({
      query: body => ({
        url: '/meal-program/restaurant', body, method: 'POST'
      })
    }),
    editRestaurant: builder.mutation<Restaurant, EditRestaurantArgs>({
     query: body => ({ url: '/meal-program/restaurant', method: 'PATCH', body})
    }),
    getAllRestaurants: builder.query<RestaurantState, void>({
      query: () => '/mealprogram/restaurant/all',
      transformResponse: (response: Restaurant[]) => _.mapKeys(response, 'id')
    })
  }),
});

export const { useGetRestaurantQuery, useCreateRestaurantMutation, useEditRestaurantMutation, useGetAllRestaurantsQuery } = restaurantApi;
