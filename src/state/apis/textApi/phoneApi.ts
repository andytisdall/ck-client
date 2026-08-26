import { api } from "../../api";
import {
  AddPhoneArgs,
  GetPhoneNumberResponse,
} from "@community-kitchens/apiinterfaces";

export const phoneApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addPhone: builder.mutation<null, AddPhoneArgs>({
      query: (body) => ({
        url: "/text/phone",
        method: "POST",
        body,
      }),
    }),

    getPhoneNumber: builder.query<GetPhoneNumberResponse, string>({
      query: (number) => ({
        url: "/text/phone/" + number,
      }),
    }),

    deletePhone: builder.mutation<null, string>({
      query: (number) => ({
        url: "/text/phone/" + number,
        method: "DELETE",
      }),
    }),

    addAllToResources: builder.mutation<string[], void>({
      query: () => ({ method: "POST", url: "/text/migrate" }),
    }),
  }),
});

export const {
  useAddPhoneMutation,
  useDeletePhoneMutation,
  useLazyGetPhoneNumberQuery,
  useAddAllToResourcesMutation,
} = phoneApi;
