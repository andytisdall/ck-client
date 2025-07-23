"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetCampaignsQuery = void 0;
var api_1 = require("../../api");
var eventsApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getCampaigns: builder.query({
            query: function () { return '/volunteers/campaigns'; },
            providesTags: ['VolunteerShifts'],
        }),
    }); },
});
exports.useGetCampaignsQuery = eventsApi.useGetCampaignsQuery;
