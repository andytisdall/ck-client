import { api } from "../../api";
import { Job } from "./types";

const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], { campaignId: string }>({
      query: ({ campaignId }) => "/volunteers/jobs/" + campaignId,
      providesTags: ["VolunteerShifts"],
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
