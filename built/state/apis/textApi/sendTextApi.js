"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateDeliveryMutation = exports.useGetFridgesQuery = exports.useSendTextMutation = exports.sendTextApi = void 0;
var api_1 = require("../../api");
exports.sendTextApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        createDelivery: builder.mutation({
            query: function (_a) {
                var fridge = _a.fridge;
                return ({
                    url: "/meal-program",
                    method: "POST",
                    body: { fridge: fridge, numberOfMealsMeat: 10, numberOfMealsVeg: 15 },
                });
            },
        }),
        getFridges: builder.query({
            query: function () { return "/home-chef/fridges"; },
        }),
        sendText: builder.mutation({
            query: function (body) {
                var postBody = new FormData();
                postBody.append("message", body.message);
                postBody.append("region", body.region);
                if (body.photo) {
                    postBody.append("photo", body.photo);
                }
                if (body.feedbackId) {
                    postBody.append("feedbackId", body.feedbackId);
                }
                if (body.number) {
                    postBody.append("number", body.number);
                }
                return {
                    url: "/text/outgoing",
                    method: "POST",
                    body: postBody,
                    formData: true,
                };
            },
            invalidatesTags: ["Feedback"],
        }),
    }); },
});
exports.useSendTextMutation = exports.sendTextApi.useSendTextMutation, exports.useGetFridgesQuery = exports.sendTextApi.useGetFridgesQuery, exports.useCreateDeliveryMutation = exports.sendTextApi.useCreateDeliveryMutation;
