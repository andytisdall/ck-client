import { api } from '../api';

type Fridge = {
  name: string;
  address: string;
  region: 'WEST_OAKLAND' | 'EAST_OAKLAND';
};

interface HomeChefNotificationArgs {
  title: string;
  message: string;
}

export const homeChefApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFridges: builder.query<Fridge[], void>({
      query: () => '/home-chef/campaign/fridges',
    }),
    sendHomeChefNotification: builder.mutation<null, HomeChefNotificationArgs>({
      query: body => ({ url: '/home-chef/notifications', body, method: 'POST'})
    })
  }),
});

export const { useGetFridgesQuery, useSendHomeChefNotificationMutation } = homeChefApi;
