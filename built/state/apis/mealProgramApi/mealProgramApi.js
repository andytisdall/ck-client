"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMigrateSurveyDataMutation = exports.useGetTotalMealsQuery = exports.useGetMealProgramScheduleQuery = void 0;
var lodash_1 = __importDefault(require("lodash"));
var api_1 = require("../../api");
var mealProgramApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getMealProgramSchedule: builder.query({
            query: function () { return "/meal-program/schedule"; },
            transformResponse: function (response) {
                return {
                    accounts: lodash_1.default.mapKeys(response.accounts, "id"),
                    deliveries: response.deliveries,
                };
            },
        }),
        getTotalMeals: builder.query({
            query: function () { return "/meal-program/campaign"; },
        }),
        migrateSurveyData: builder.mutation({
            query: function () { return ({ url: "/meal-program/survey/migrate", method: "POST" }); },
        }),
    }); },
});
exports.useGetMealProgramScheduleQuery = mealProgramApi.useGetMealProgramScheduleQuery, exports.useGetTotalMealsQuery = mealProgramApi.useGetTotalMealsQuery, exports.useMigrateSurveyDataMutation = mealProgramApi.useMigrateSurveyDataMutation;
