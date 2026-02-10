import { api } from "../../../api";
import { SendInviteArgs } from "./types";
import { Campaign } from "../types";

export interface Times {
  "9": boolean;
  "2": boolean;
  "4": boolean;
}

export interface Items {
  "Grains (rice, pasta)": boolean;
  "Legumes (beans, lentils)": boolean;
  "Animal protein (chicken, beef)": boolean;
  "Non-animal protein (tofu, seitan)": boolean;
  Cheese: boolean;
  Eggs: boolean;
}

export interface Days {
  sun: Times;
  mon: Times;
  tues: Times;
  wed: Times;
  thurs: Times;
}

interface SurveyArgs {
  times: Days;
  items: Items;
  more?: "items" | "dates";
  otherTime: string;
  otherItem: string;
}

export const homeChefApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCampaign: builder.query<Campaign, void>({
      query: () => "/home-chef/campaign",
    }),
    sendInvite: builder.mutation<null, SendInviteArgs>({
      query: (body) => ({
        url: "/home-chef/invite",
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
    submitSurvey: builder.mutation<null, SurveyArgs>({
      query: (body) => ({
        url: "/home-chef/survey",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserInfo"],
    }),
  }),
});

export const {
  useGetCampaignQuery,
  useSendInviteMutation,
  useUploadFoodHandlerCertificateMutation,
  useSubmitSurveyMutation,
} = homeChefApi;
