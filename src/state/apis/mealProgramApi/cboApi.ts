import { api } from "../../api";
import { CBOReport } from "@community-kitchens/apiinterfaces";

const cboApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCBOReports: builder.query<
      CBOReport[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `/meal-program/cbo/reports/${startDate}&${endDate}`,
      providesTags: ["CBOData"],
    }),
    emailReport: builder.mutation<null, void>({
      query: () => ({ url: "/meal-program/cbo/email/mollye", method: "POST" }),
    }),
  }),
});

export const { useGetCBOReportsQuery, useEmailReportMutation } = cboApi;
