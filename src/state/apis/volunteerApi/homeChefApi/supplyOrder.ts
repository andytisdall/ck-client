import { api } from "../../../api";

import { SupplyOrder, SupplyOrderInfo } from "./types";

export const supplyOrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    orderSupplies: builder.mutation<null, SupplyOrderInfo>({
      query: (body) => ({ url: "/home-chef/ordering", body, method: "POST" }),
      invalidatesTags: ["HomeChefSupplies"],
    }),
    getFulfilledSupplyOrders: builder.query<SupplyOrder[], void>({
      query: () => "/home-chef/ordering/fulfilled",
      providesTags: ["HomeChefSupplies"],
    }),
    getUnfulfilledSupplyOrders: builder.query<SupplyOrder[], void>({
      query: () => "/home-chef/ordering/unfulfilled",
      providesTags: ["HomeChefSupplies"],
    }),
    updateSupplyOrders: builder.mutation<null, { orders: string[] }>({
      query: (body) => ({ url: "/home-chef/ordering", method: "PATCH", body }),
      invalidatesTags: ["HomeChefSupplies"],
    }),
    createManualSupplyOrder: builder.mutation<
      null,
      { firstName: string; lastName: string; items: SupplyOrderInfo }
    >({
      query: (body) => ({
        body,
        url: "/home-chef/ordering/manual",
        method: "POST",
      }),
      invalidatesTags: ["HomeChefSupplies"],
    }),
  }),
});

export const {
  useOrderSuppliesMutation,
  useGetFulfilledSupplyOrdersQuery,
  useGetUnfulfilledSupplyOrdersQuery,
  useUpdateSupplyOrdersMutation,
  useCreateManualSupplyOrderMutation,
} = supplyOrderApi;
