"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateContactMutation = exports.useGetSigningUrlQuery = void 0;
var api_1 = require("../api");
var acrobatApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getSigningUrl: builder.query({
            query: function (_a) {
                var doc = _a.doc, id = _a.id;
                return "/acrobat/".concat(doc).concat(id ? '/' + id : '');
            },
        }),
        updateContact: builder.mutation({
            query: function (body) { return ({
                url: '/acrobat/update-contact',
                method: 'POST',
                body: body,
            }); },
            invalidatesTags: ['UserInfo', 'RestaurantInfo', 'Volunteer'],
        }),
    }); },
});
exports.useGetSigningUrlQuery = acrobatApi.useGetSigningUrlQuery, exports.useUpdateContactMutation = acrobatApi.useUpdateContactMutation;
