"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var UploadPhoto_1 = __importDefault(require("./UploadPhoto"));
var driver_1 = require("../../../state/apis/volunteerApi/driver");
var License = function () {
    var _a = __read((0, driver_1.useUploadLicenseMutation)(), 2), uploadLicense = _a[0], isLoading = _a[1].isLoading;
    return ((0, jsx_runtime_1.jsx)(UploadPhoto_1.default, { upload: uploadLicense, isLoading: isLoading, label: "Driver's License", dateLabel: "Driver's License Expiration Date:" }));
};
exports.default = License;
