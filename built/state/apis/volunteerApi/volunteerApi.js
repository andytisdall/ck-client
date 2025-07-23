"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetHourQuery = exports.useGetHoursQuery = exports.useGetVolunteerQuery = exports.useCancelVolunteerShiftMutation = exports.useSignUpForVolunteerShiftMutation = exports.useCreateVolunteerMutation = exports.useLazyGetVolunteerQuery = exports.volunteerApi = void 0;
var api_1 = require("../../api");
exports.volunteerApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getVolunteer: builder.query({
            query: function (email) { return "/volunteers/" + email; },
            providesTags: ["Volunteer"],
        }),
        getHours: builder.query({
            query: function (_a) {
                var campaignId = _a.campaignId, contactId = _a.contactId;
                return "/volunteers/hours/".concat(campaignId, "/").concat(contactId);
            },
            providesTags: ["VolunteerHours"],
        }),
        getHour: builder.query({
            query: function (hoursId) { return "volunteers/hour/".concat(hoursId); },
            providesTags: ["VolunteerHours"],
        }),
        createVolunteer: builder.mutation({
            query: function (body) { return ({
                url: "/volunteers",
                body: body,
                method: "POST",
            }); },
        }),
        signUpForVolunteerShift: builder.mutation({
            query: function (body) { return ({
                url: "/volunteers/hours",
                method: "POST",
                body: body,
            }); },
            invalidatesTags: ["VolunteerHours", "VolunteerShifts"],
        }),
        cancelVolunteerShift: builder.mutation({
            query: function (body) {
                var url = "/volunteers/hours/" + body.hoursId;
                if (body.contactId) {
                    url = url + "/" + body.contactId;
                }
                return { url: url, method: "DELETE" };
            },
            invalidatesTags: ["VolunteerHours", "VolunteerShifts"],
        }),
    }); },
});
exports.useLazyGetVolunteerQuery = exports.volunteerApi.useLazyGetVolunteerQuery, exports.useCreateVolunteerMutation = exports.volunteerApi.useCreateVolunteerMutation, exports.useSignUpForVolunteerShiftMutation = exports.volunteerApi.useSignUpForVolunteerShiftMutation, exports.useCancelVolunteerShiftMutation = exports.volunteerApi.useCancelVolunteerShiftMutation, exports.useGetVolunteerQuery = exports.volunteerApi.useGetVolunteerQuery, exports.useGetHoursQuery = exports.volunteerApi.useGetHoursQuery, exports.useGetHourQuery = exports.volunteerApi.useGetHourQuery;
