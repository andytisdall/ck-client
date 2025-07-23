"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUploadFoodHandlerCertificateMutation = exports.useSubmitQuizAnswersMutation = exports.useGetQuizQuestionsQuery = exports.useGetHomeChefNotificationsQuery = exports.useEditHoursMutation = exports.useSendInviteMutation = exports.useGetHomeChefHoursQuery = exports.useSignUpForHomeChefShiftMutation = exports.useGetShiftsQuery = exports.useGetCampaignQuery = exports.useSendHomeChefNotificationMutation = exports.homeChefApi = void 0;
var lodash_1 = __importDefault(require("lodash"));
var api_1 = require("../../api");
exports.homeChefApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        sendHomeChefNotification: builder.mutation({
            query: function (body) { return ({
                url: "/home-chef/notifications",
                body: body,
                method: "POST",
            }); },
            invalidatesTags: ["PushNotifications"],
        }),
        getHomeChefNotifications: builder.query({
            query: function () { return "/home-chef/notifications"; },
            providesTags: ["PushNotifications"],
        }),
        getCampaign: builder.query({
            query: function () { return "/home-chef/campaign"; },
        }),
        getShifts: builder.query({
            query: function () { return "/home-chef/job-listing"; },
            transformResponse: function (response) { return ({
                shifts: lodash_1.default.mapKeys(response.shifts, "id"),
                jobs: response.jobs,
            }); },
            providesTags: ["HomeChefShifts"],
        }),
        signUpForHomeChefShift: builder.mutation({
            query: function (body) { return ({
                url: "/home-chef/hours",
                body: body,
                method: "POST",
            }); },
            invalidatesTags: ["HomeChefHours", "HomeChefShifts"],
        }),
        getHomeChefHours: builder.query({
            query: function () { return "/home-chef/hours"; },
            transformResponse: function (response) {
                return lodash_1.default.mapKeys(response, "id");
            },
            providesTags: ["HomeChefHours"],
        }),
        sendInvite: builder.mutation({
            query: function (body) { return ({
                url: "home-chef/invite",
                body: body,
                method: "POST",
            }); },
        }),
        editHours: builder.mutation({
            query: function (_a) {
                var id = _a.id, mealCount = _a.mealCount, cancel = _a.cancel, date = _a.date, fridge = _a.fridge;
                return ({
                    url: "/home-chef/hours/" + id,
                    method: "PATCH",
                    body: { mealCount: mealCount, cancel: cancel, emailData: { fridge: fridge, date: date } },
                });
            },
            invalidatesTags: ["HomeChefHours"],
        }),
        getQuizQuestions: builder.query({
            query: function () { return "/home-chef/quiz"; },
        }),
        submitQuizAnswers: builder.mutation({
            query: function (body) { return ({
                body: body,
                url: "/home-chef/quiz",
                method: "POST",
            }); },
            invalidatesTags: ["UserInfo"],
        }),
        uploadFoodHandlerCertificate: builder.mutation({
            query: function (file) {
                var body = new FormData();
                body.append("FH", file);
                return {
                    url: "/home-chef/food-handler",
                    body: body,
                    formData: true,
                    method: "POST",
                };
            },
            invalidatesTags: ["UserInfo"],
        }),
    }); },
});
exports.useSendHomeChefNotificationMutation = exports.homeChefApi.useSendHomeChefNotificationMutation, exports.useGetCampaignQuery = exports.homeChefApi.useGetCampaignQuery, exports.useGetShiftsQuery = exports.homeChefApi.useGetShiftsQuery, exports.useSignUpForHomeChefShiftMutation = exports.homeChefApi.useSignUpForHomeChefShiftMutation, exports.useGetHomeChefHoursQuery = exports.homeChefApi.useGetHomeChefHoursQuery, exports.useSendInviteMutation = exports.homeChefApi.useSendInviteMutation, exports.useEditHoursMutation = exports.homeChefApi.useEditHoursMutation, exports.useGetHomeChefNotificationsQuery = exports.homeChefApi.useGetHomeChefNotificationsQuery, exports.useGetQuizQuestionsQuery = exports.homeChefApi.useGetQuizQuestionsQuery, exports.useSubmitQuizAnswersMutation = exports.homeChefApi.useSubmitQuizAnswersMutation, exports.useUploadFoodHandlerCertificateMutation = exports.homeChefApi.useUploadFoodHandlerCertificateMutation;
