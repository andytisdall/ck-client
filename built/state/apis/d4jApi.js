"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeclareWinnerMutation = exports.useSetStyleWeekActiveMutation = exports.useGetStyleWeekActiveQuery = exports.useLazyDeleteAndyQuery = exports.useConfirmEmailMutation = exports.useVerifyDeleteAccountCodeMutation = exports.useLazyGenerateDeleteAccountCodeQuery = exports.useDrawPrizeMutation = exports.useGetD4JNotificationsQuery = exports.useSendD4JNotificationMutation = void 0;
var api_1 = require("../api");
var d4jApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        drawPrize: builder.mutation({
            query: function () { return ({
                url: "/d4j/rewards/prize-drawing",
                method: "POST",
            }); },
        }),
        sendD4JNotification: builder.mutation({
            query: function (body) { return ({
                url: "/d4j/notifications",
                body: body,
                method: "POST",
            }); },
            invalidatesTags: ["PushNotifications"],
        }),
        getD4JNotifications: builder.query({
            query: function () { return "/d4j/notifications"; },
            providesTags: ["PushNotifications"],
        }),
        generateDeleteAccountCode: builder.query({
            query: function (email) { return "/d4j/delete-account/" + email; },
        }),
        verifyDeleteAccountCode: builder.mutation({
            query: function (body) { return ({
                method: "POST",
                url: "/d4j/delete-account",
                body: body,
            }); },
        }),
        confirmEmail: builder.mutation({
            query: function (body) { return ({ url: "/d4j/confirm-email", method: "POST", body: body }); },
        }),
        deleteAndy: builder.query({
            query: function () { return "/d4j/delete-andy"; },
        }),
        getStyleWeekActive: builder.query({
            query: function () { return "/d4j/style-week"; },
            providesTags: ["D4JConfig"],
        }),
        setStyleWeekActive: builder.mutation({
            query: function (body) { return ({ url: "/d4j/style-week", method: "POST", body: body }); },
            invalidatesTags: ["D4JConfig"],
        }),
        declareWinner: builder.mutation({
            query: function () { return ({ url: "/d4j/contest/winner", method: "POST" }); },
        }),
    }); },
});
exports.useSendD4JNotificationMutation = d4jApi.useSendD4JNotificationMutation, exports.useGetD4JNotificationsQuery = d4jApi.useGetD4JNotificationsQuery, exports.useDrawPrizeMutation = d4jApi.useDrawPrizeMutation, exports.useLazyGenerateDeleteAccountCodeQuery = d4jApi.useLazyGenerateDeleteAccountCodeQuery, exports.useVerifyDeleteAccountCodeMutation = d4jApi.useVerifyDeleteAccountCodeMutation, exports.useConfirmEmailMutation = d4jApi.useConfirmEmailMutation, exports.useLazyDeleteAndyQuery = d4jApi.useLazyDeleteAndyQuery, exports.useGetStyleWeekActiveQuery = d4jApi.useGetStyleWeekActiveQuery, exports.useSetStyleWeekActiveMutation = d4jApi.useSetStyleWeekActiveMutation, exports.useDeclareWinnerMutation = d4jApi.useDeclareWinnerMutation;
