import { api } from "../../api";

interface ClientMeal {
  client: string;
  date: string;
  id: string;
}

interface AddMealsArgs {
  meals: string[];
  clientId: string;
}

const doorfrontApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClientMeals: builder.query<ClientMeal[], string>({
      query: (clientId) => "/meal-program/doorfront/" + clientId,
      providesTags: ["Doorfront"],
    }),
    addMeals: builder.mutation<null, AddMealsArgs>({
      query: (body) => ({
        body,
        url: "/meal-program/doorfront",
        method: "POST",
      }),
      invalidatesTags: ["Doorfront"],
    }),
  }),
});

export const { useGetClientMealsQuery, useAddMealsMutation } = doorfrontApi;
