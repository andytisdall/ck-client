"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var date_fns_tz_1 = require("date-fns-tz");
var formatDateTime_1 = require("../formatDateTime");
var ShiftInfoField_1 = __importDefault(require("./ShiftInfoField"));
var DriverShiftInfo = function (_a) {
    var shift = _a.shift, job = _a.job;
    var endTime = (0, date_fns_1.formatISO)((0, date_fns_1.addHours)((0, date_fns_tz_1.utcToZonedTime)(shift.startTime, "America/Los_Angeles"), shift.duration));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-detail", children: [(0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Job", value: job.name }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Description", value: job.description }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Minimum Vehicle Size Required", value: shift.carSizeRequired }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Pick Up Location", value: "".concat(job.location, ", ").concat(job.locationCity), notes: job.locationInfo }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Drop Off Location", value: shift.destination, notes: shift.dropoffNotes }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Distance", value: shift.distance }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Date", value: (0, formatDateTime_1.formatDate)(shift.startTime) }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Pickup Window", value: "".concat((0, formatDateTime_1.formatTime)(shift.startTime), "\n            - ").concat((0, formatDateTime_1.formatTime)(endTime)) })] }));
};
exports.default = DriverShiftInfo;
