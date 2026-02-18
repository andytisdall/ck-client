import { api } from "../../api";
import { DriverJob, Job } from "./types";

const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[] | DriverJob[], { campaignId: string }>({
      query: ({ campaignId }) => "/volunteers/jobs/" + campaignId,
      providesTags: ["VolunteerShifts"],
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
