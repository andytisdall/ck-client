"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyGetMealsQuery = exports.useAddMealsMutation = exports.useGetClientQuery = void 0;
var api_1 = require("../../api");
var doorfrontApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getClient: builder.query({
            query: function (clientId) { return "/meal-program/doorfront/" + clientId; },
            providesTags: ["Doorfront"],
        }),
        addMeals: builder.mutation({
            query: function (body) { return ({
                body: body,
                url: "/meal-program/doorfront/meals",
                method: "POST",
            }); },
            invalidatesTags: ["Doorfront"],
        }),
        getMeals: builder.query({
            query: function (date) { return "/meal-program/doorfront/meals/" + date; },
        }),
    }); },
});
exports.useGetClientQuery = doorfrontApi.useGetClientQuery, exports.useAddMealsMutation = doorfrontApi.useAddMealsMutation, exports.useLazyGetMealsQuery = doorfrontApi.useLazyGetMealsQuery;
