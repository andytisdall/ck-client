import { api } from '../api';

type Fridge = {
  name: string;
  address: string;
  region: 'WEST_OAKLAND' | 'EAST_OAKLAND';
};

export const homeChefApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFridges: builder.query<Fridge[], void>({
      query: () => '/home-chef/campaign/fridges',
    }),
  }),
});

export const { useGetFridgesQuery } = homeChefApi;
