import { api } from '../../api';

interface KitchenVolunteer {
  firstName?: string;
  lastName: string;
  email?: string;
  agreementSigned: boolean;
}

const kitchenApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodaysKitchenVolunteers: builder.query<KitchenVolunteer[], void>({
      query: () => '/volunteers/kitchen/contact',
    }),
  }),
});

export const { useGetTodaysKitchenVolunteersQuery } = kitchenApi;
