"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetRestaurantInfoQuery = exports.useGetAllRestaurantsQuery = exports.useEditRestaurantMutation = exports.useCreateRestaurantMutation = exports.useGetRestaurantQuery = exports.restaurantApi = void 0;
var lodash_1 = __importDefault(require("lodash"));
var api_1 = require("../../api");
exports.restaurantApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getRestaurant: builder.query({
            query: function () { return '/meal-program/restaurant'; },
            providesTags: ['Restaurant'],
        }),
        createRestaurant: builder.mutation({
            query: function (body) { return ({
                url: '/meal-program/restaurant',
                body: body,
                method: 'POST',
            }); },
            invalidatesTags: ['Restaurant'],
        }),
        editRestaurant: builder.mutation({
            query: function (body) { return ({
                url: '/meal-program/restaurant',
                method: 'PATCH',
                body: body,
            }); },
            invalidatesTags: ['Restaurant'],
        }),
        getAllRestaurants: builder.query({
            query: function () { return '/meal-program/restaurant/all'; },
            transformResponse: function (response) { return lodash_1.default.mapKeys(response, 'id'); },
        }),
        getRestaurantInfo: builder.query({
            query: function () { return '/meal-program/restaurant/meal-program-info'; },
            providesTags: ['RestaurantInfo'],
        }),
    }); },
});
exports.useGetRestaurantQuery = exports.restaurantApi.useGetRestaurantQuery, exports.useCreateRestaurantMutation = exports.restaurantApi.useCreateRestaurantMutation, exports.useEditRestaurantMutation = exports.restaurantApi.useEditRestaurantMutation, exports.useGetAllRestaurantsQuery = exports.restaurantApi.useGetAllRestaurantsQuery, exports.useGetRestaurantInfoQuery = exports.restaurantApi.useGetRestaurantInfoQuery;
