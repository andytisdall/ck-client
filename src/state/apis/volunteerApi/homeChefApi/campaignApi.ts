import { api } from "../../../api";
import { SendInviteArgs } from "./types";
import { Campaign } from "../types";

export const homeChefApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCampaign: builder.query<Campaign, void>({
      query: () => "/home-chef/campaign",
    }),
    sendInvite: builder.mutation<null, SendInviteArgs>({
      query: (body) => ({
        url: "home-chef/invite",
        body,
        method: "POST",
      }),
    }),
    uploadFoodHandlerCertificate: builder.mutation<null, File>({
      query: (file) => {
        const body = new FormData();
        body.append("FH", file);
        return {
          url: "/home-chef/food-handler",
          body,
          formData: true,
          method: "POST",
        };
      },
      invalidatesTags: ["UserInfo"],
    }),
  }),
});

export const {
  useGetCampaignQuery,
  useSendInviteMutation,
  useUploadFoodHandlerCertificateMutation,
} = homeChefApi;
