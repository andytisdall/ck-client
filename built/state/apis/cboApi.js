"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmailReportMutation = exports.useGetCBOReportsQuery = void 0;
var api_1 = require("../api");
var cboApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getCBOReports: builder.query({
            query: function () { return '/meal-program/cbo/reports'; },
            providesTags: ['CBOData'],
        }),
        emailReport: builder.mutation({
            query: function () { return ({ url: '/meal-program/cbo/email', method: 'POST' }); },
        }),
    }); },
});
exports.useGetCBOReportsQuery = cboApi.useGetCBOReportsQuery, exports.useEmailReportMutation = cboApi.useEmailReportMutation;
