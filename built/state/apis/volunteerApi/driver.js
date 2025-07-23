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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUploadInsuranceMutation = exports.useSubmitCarInfoMutation = exports.useUploadLicenseMutation = exports.useGetDriverQuery = exports.optimisticallyUpdateDriverStatus = void 0;
var api_1 = require("../../api");
var driverApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getDriver: builder.query({
            query: function () { return "/volunteers/driver"; },
            providesTags: ["DriverInfo"],
        }),
        uploadLicense: builder.mutation({
            query: function (_a) {
                var file = _a.file, date = _a.date;
                var body = new FormData();
                body.append("DL", file);
                body.append("expirationDate", date);
                return {
                    url: "/volunteers/driver/license",
                    body: body,
                    formData: true,
                    method: "POST",
                };
            },
            invalidatesTags: ["DriverInfo"],
        }),
        uploadInsurance: builder.mutation({
            query: function (_a) {
                var file = _a.file, date = _a.date;
                var body = new FormData();
                body.append("INS", file);
                body.append("expirationDate", date);
                return {
                    url: "/volunteers/driver/insurance",
                    body: body,
                    formData: true,
                    method: "POST",
                };
            },
            invalidatesTags: ["DriverInfo"],
        }),
        submitCarInfo: builder.mutation({
            query: function (body) { return ({
                method: "POST",
                body: body,
                url: "/volunteers/driver/car",
            }); },
            invalidatesTags: ["DriverInfo"],
        }),
    }); },
});
exports.optimisticallyUpdateDriverStatus = driverApi.util.updateQueryData("getDriver", undefined, function (driverInfo) {
    if (!driverInfo) {
        return null;
    }
    var newUserInfo = __assign(__assign({}, driverInfo), { volunteerAgreement: true });
    if (driverInfo.car &&
        driverInfo.licenseExpiration &&
        driverInfo.insuranceExpiration &&
        new Date(driverInfo.licenseExpiration) > new Date() &&
        new Date(driverInfo.insuranceExpiration) > new Date()) {
        newUserInfo.driverStatus = "Active";
    }
    return newUserInfo;
});
exports.useGetDriverQuery = driverApi.useGetDriverQuery, exports.useUploadLicenseMutation = driverApi.useUploadLicenseMutation, exports.useSubmitCarInfoMutation = driverApi.useSubmitCarInfoMutation, exports.useUploadInsuranceMutation = driverApi.useUploadInsuranceMutation;
