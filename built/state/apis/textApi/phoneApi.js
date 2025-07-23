"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyGetPhoneNumberQuery = exports.useDeletePhoneMutation = exports.useAddPhoneMutation = exports.phoneApi = void 0;
var api_1 = require("../../api");
exports.phoneApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        addPhone: builder.mutation({
            query: function (body) { return ({
                url: '/text/phone',
                method: 'POST',
                body: body,
            }); },
        }),
        getPhoneNumber: builder.query({
            query: function (number) { return ({
                url: '/text/phone/' + number,
            }); },
        }),
        deletePhone: builder.mutation({
            query: function (number) { return ({
                url: '/text/phone/' + number,
                method: 'DELETE',
            }); },
        }),
    }); },
});
exports.useAddPhoneMutation = exports.phoneApi.useAddPhoneMutation, exports.useDeletePhoneMutation = exports.phoneApi.useDeletePhoneMutation, exports.useLazyGetPhoneNumberQuery = exports.phoneApi.useLazyGetPhoneNumberQuery;
