import { api } from "../../api";

export interface ClientMeal {
  client: Client | null;
  date: string;
  id: string;
  amount: number;
  logged: boolean;
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
  cCode?: string;
  barcode: string[];
  cCodeIncorrect?: boolean;
}

export type MonthlyReportResponse = Record<
  string,
  { meals: number; visits: number }
> | null;

interface MonthlyReportArgs {
  startDate: string;
  endDate: string;
}

const doorfrontApi = api.injectEndpoints({
  endpoints: (builder) => ({
    scan: builder.query<
      GetClientMealsResponse,
      { scanValue: string; useCcode: boolean }
    >({
      query: ({ scanValue, useCcode }) =>
        useCcode
          ? "/meal-program/doorfront/client/lookup-by-client-number/" +
            scanValue
          : "/meal-program/doorfront/scan/" + scanValue,
      providesTags: ["Doorfront"],
    }),
    getClient: builder.query<GetClientMealsResponse, string>({
      query: (id) => "/meal-program/doorfront/client/" + id,
      providesTags: ["Doorfront"],
    }),
    getClients: builder.query<Client[], void>({
      query: () => "/meal-program/doorfront/clients",
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
    getMeals: builder.query<
      ClientMeal[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        "/meal-program/doorfront/meals/" + startDate + "&" + endDate,
      providesTags: ["Doorfront"],
    }),
    editClient: builder.mutation<null, Client>({
      query: (body) => ({
        url: "/meal-program/doorfront/client/" + body.id,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Doorfront"],
    }),
    logMeals: builder.mutation<null, { mealIds: string[] }>({
      query: (body) => ({
        url: "/meal-program/doorfront/meals",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Doorfront"],
    }),
    deleteClient: builder.mutation<null, string>({
      query: (id) => ({
        url: "/meal-program/doorfront/client/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Doorfront"],
    }),
    deleteMeal: builder.mutation<null, string>({
      query: (id) => ({
        url: "/meal-program/doorfront/meal/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Doorfront"],
    }),
    getMonthlyMeals: builder.query<MonthlyReportResponse, MonthlyReportArgs>({
      query: ({ startDate, endDate }) =>
        "/meal-program/doorfront/monthly/" + startDate + "&" + endDate,
      providesTags: ["Doorfront"],
    }),
  }),
});

export const {
  useScanQuery,
  useGetClientQuery,
  useAddMealsMutation,
  useLazyGetMealsQuery,
  useEditClientMutation,
  useLogMealsMutation,
  useGetClientsQuery,
  useDeleteClientMutation,
  useDeleteMealMutation,
  useGetMonthlyMealsQuery,
} = doorfrontApi;
