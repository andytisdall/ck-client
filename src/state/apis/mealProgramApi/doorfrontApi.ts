import { api } from "../../api";

export interface ClientMeal {
  client: string;
  date: string;
  id: string;
  amount: number;
}

interface AddMealsArgs {
  meals: number;
  clientId: string;
}

interface GetClientMealsResponse {
  clientMeals: ClientMeal[];
  client: Client;
}

export interface Client {
  id: string;
  cCode: string;
  barcode: string;
}

const doorfrontApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClient: builder.query<GetClientMealsResponse, string>({
      query: (clientId) => "/meal-program/doorfront/" + clientId,
      providesTags: ["Doorfront"],
    }),
    addMeals: builder.mutation<null, AddMealsArgs>({
      query: (body) => ({
        body,
        url: "/meal-program/doorfront/meals",
        method: "POST",
      }),
      invalidatesTags: ["Doorfront"],
    }),
    getMeals: builder.query<ClientMeal[], string>({
      query: (date) => "/meal-program/doorfront/meals/" + date,
    }),
  }),
});

export const { useGetClientQuery, useAddMealsMutation, useLazyGetMealsQuery } =
  doorfrontApi;
