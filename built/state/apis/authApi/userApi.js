"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimisticallyUpdateHomeChefAgreement = exports.useTestEmailMutation = exports.useForgotPasswordMutation = exports.useResetPasswordMutation = exports.useConnectGoogleMutation = exports.useDeleteUserMutation = exports.useCreateUserMutation = exports.useGetUserInfoQuery = exports.useGetAllUsersQuery = exports.useEditUserMutation = exports.useGetUserQuery = exports.userApi = void 0;
var lodash_1 = __importDefault(require("lodash"));
var api_1 = require("../../api");
exports.userApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getUser: builder.query({
            query: function () { return "/user"; },
            providesTags: ["User"],
        }),
        getUserInfo: builder.query({
            query: function () { return "/user/userInfo"; },
            providesTags: ["UserInfo"],
        }),
        editUser: builder.mutation({
            query: function (body) { return ({
                url: "/user",
                body: body,
                method: "PATCH",
            }); },
            invalidatesTags: ["User", "UserInfo", "AllUsers"],
        }),
        getAllUsers: builder.query({
            query: function () { return ({
                url: "/user/all",
            }); },
            transformResponse: function (response) { return lodash_1.default.mapKeys(response, "id"); },
            providesTags: ["AllUsers"],
        }),
        createUser: builder.mutation({
            query: function (body) { return ({
                url: "/user",
                body: body,
                method: "POST",
            }); },
            invalidatesTags: ["AllUsers", "User"],
        }),
        deleteUser: builder.mutation({
            query: function (userId) { return ({
                url: "/user/" + userId,
                method: "DELETE",
            }); },
            invalidatesTags: ["AllUsers"],
        }),
        connectGoogle: builder.mutation({
            query: function (credential) { return ({
                url: "/user/connect-google",
                body: { credential: credential },
                method: "POST",
            }); },
            invalidatesTags: ["User"],
        }),
        forgotPassword: builder.mutation({
            query: function (email) { return ({
                url: "/user/forgot-password",
                method: "POST",
                body: { email: email },
            }); },
        }),
        resetPassword: builder.mutation({
            query: function (body) { return ({
                url: "/user/reset-password",
                method: "POST",
                body: body,
            }); },
        }),
        testEmail: builder.mutation({
            query: function () { return ({
                url: "/user/email",
                method: "POST",
            }); },
        }),
    }); },
});
exports.useGetUserQuery = exports.userApi.useGetUserQuery, exports.useEditUserMutation = exports.userApi.useEditUserMutation, exports.useGetAllUsersQuery = exports.userApi.useGetAllUsersQuery, exports.useGetUserInfoQuery = exports.userApi.useGetUserInfoQuery, exports.useCreateUserMutation = exports.userApi.useCreateUserMutation, exports.useDeleteUserMutation = exports.userApi.useDeleteUserMutation, exports.useConnectGoogleMutation = exports.userApi.useConnectGoogleMutation, exports.useResetPasswordMutation = exports.userApi.useResetPasswordMutation, exports.useForgotPasswordMutation = exports.userApi.useForgotPasswordMutation, exports.useTestEmailMutation = exports.userApi.useTestEmailMutation;
exports.optimisticallyUpdateHomeChefAgreement = exports.userApi.util.updateQueryData("getUserInfo", undefined, function (userInfo) {
    var newUserInfo = __assign(__assign({}, userInfo), { homeChefAgreement: true });
    if (userInfo.foodHandler && userInfo.homeChefQuizPassed) {
        newUserInfo.homeChefStatus = "Active";
    }
    return newUserInfo;
});
