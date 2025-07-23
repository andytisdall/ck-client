"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateVolunteerHoursMutation = exports.useGetTodaysShiftsQuery = exports.useCheckInVolunteerMutation = exports.useGetVolunteersForCheckInQuery = void 0;
var api_1 = require("../../api");
var checkInApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getTodaysShifts: builder.query({
            query: function () { return "/volunteers/check-in/shifts"; },
        }),
        getVolunteersForCheckIn: builder.query({
            query: function (shiftId) { return "/volunteers/check-in/" + shiftId; },
            providesTags: ["VolunteerCheckInList"],
        }),
        checkInVolunteer: builder.mutation({
            query: function (body) { return ({
                url: "/volunteers/check-in",
                method: "POST",
                body: body,
            }); },
            invalidatesTags: ["VolunteerCheckInList"],
        }),
        createVolunteerHours: builder.mutation({
            query: function (body) { return ({
                body: body,
                url: "/volunteers/check-in/hours",
                method: "POST",
            }); },
            invalidatesTags: ["VolunteerCheckInList"],
        }),
    }); },
});
exports.useGetVolunteersForCheckInQuery = checkInApi.useGetVolunteersForCheckInQuery, exports.useCheckInVolunteerMutation = checkInApi.useCheckInVolunteerMutation, exports.useGetTodaysShiftsQuery = checkInApi.useGetTodaysShiftsQuery, exports.useCreateVolunteerHoursMutation = checkInApi.useCreateVolunteerHoursMutation;
