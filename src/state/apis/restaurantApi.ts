import { api } from '../api';

type Restaurant = { name: string };

export const restaurantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurant: builder.query<Restaurant, void>({
      query: () => 'meal-program/restaurant',
    }),
  }),
});

export const { useGetRestaurantQuery } = restaurantApi;
