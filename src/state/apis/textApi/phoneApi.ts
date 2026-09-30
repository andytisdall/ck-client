import { api } from "../../api";
import {
  AddPhoneArgs,
  GetPhoneNumberResponse,
  GetVoicemailResponse,
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

    getVoicemail: builder.query<GetVoicemailResponse, void>({
      query: () => "/voicemail",
      providesTags: ["Voicemail"],
    }),

    deleteVoicemail: builder.mutation<null, string>({
      query: (id) => ({ method: "DELETE", url: "/voicemail/" + id }),
      invalidatesTags: ["Voicemail"],
    }),
  }),
});

export const {
  useAddPhoneMutation,
  useDeletePhoneMutation,
  useLazyGetPhoneNumberQuery,
  useGetVoicemailQuery,
  useDeleteVoicemailMutation,
} = phoneApi;
