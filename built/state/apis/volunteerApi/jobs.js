"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetJobsQuery = void 0;
var api_1 = require("../../api");
var jobsApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getJobs: builder.query({
            query: function (_a) {
                var campaignId = _a.campaignId;
                return "/volunteers/jobs/" + campaignId;
            },
            providesTags: ["VolunteerShifts"],
        }),
    }); },
});
exports.useGetJobsQuery = jobsApi.useGetJobsQuery;
