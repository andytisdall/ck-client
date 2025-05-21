import { api } from "../../api";
import { Job } from "./types";

const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], { campaignId: string }>({
      query: ({ campaignId }) => "/volunteers/jobs/" + campaignId,
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
