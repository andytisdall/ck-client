"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteFeedbackMutation = exports.useGetFeedbackQuery = void 0;
var lodash_1 = __importDefault(require("lodash"));
var api_1 = require("../../api");
var feedbackApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getFeedback: builder.query({
            query: function () { return ({ url: '/text/feedback' }); },
            providesTags: ['Feedback'],
            transformResponse: function (response) { return lodash_1.default.mapKeys(response, 'id'); }
        }),
        deleteFeedback: builder.mutation({
            query: function (id) { return ({ url: '/text/feedback/' + id, method: 'DELETE' }); },
            invalidatesTags: ['Feedback']
        })
    }); }
});
exports.useGetFeedbackQuery = feedbackApi.useGetFeedbackQuery, exports.useDeleteFeedbackMutation = feedbackApi.useDeleteFeedbackMutation;
