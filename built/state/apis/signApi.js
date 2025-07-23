"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequestHomeChefAgreementQuery = exports.useGetSigningConfigQuery = exports.useGetSigningUrlQuery = void 0;
var api_1 = require("../api");
var signApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getSigningUrl: builder.query({
            query: function (_a) {
                var doc = _a.doc, contactId = _a.contactId, hoursId = _a.hoursId;
                return "/sign/".concat(doc).concat(contactId ? "/".concat(hoursId, "/").concat(contactId) : "");
            },
        }),
        getSigningConfig: builder.query({
            query: function () { return "/sign/config"; },
        }),
        requestHomeChefAgreement: builder.query({
            query: function () { return "/sign/emailAgreement"; },
        }),
    }); },
});
exports.useGetSigningUrlQuery = signApi.useGetSigningUrlQuery, exports.useGetSigningConfigQuery = signApi.useGetSigningConfigQuery, exports.useRequestHomeChefAgreementQuery = signApi.useRequestHomeChefAgreementQuery;
