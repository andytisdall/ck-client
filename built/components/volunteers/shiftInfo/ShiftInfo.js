"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var ShiftInfoField_1 = __importDefault(require("./ShiftInfoField"));
var config_1 = __importDefault(require("../config"));
var formatDateTime_1 = require("../formatDateTime");
var DriverInfo_1 = __importDefault(require("./DriverInfo"));
require("./ShiftInfo.css");
var ShiftInfo = function (_a) {
    var job = _a.job, shift = _a.shift, campaign = _a.campaign;
    var volunteer = (0, react_redux_1.useSelector)(function (state) { return state.volunteer.volunteer; });
    var driver = campaign.id === config_1.default.deliveryDrivers.id;
    var renderVolunteer = function () {
        if (volunteer) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "vol-info", children: [(0, jsx_runtime_1.jsx)("b", { children: "Your Info:" }), (0, jsx_runtime_1.jsx)("ul", { children: (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Name:" }), " ", volunteer.name] }) })] }));
        }
    };
    if (driver) {
        return (0, jsx_runtime_1.jsx)(DriverInfo_1.default, { shift: shift, job: job });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-detail", children: [(0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Job", value: job.name }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Description", value: job.description }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Location", value: job.location }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Date", value: (0, formatDateTime_1.formatDate)(shift.startTime) }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Time", value: (0, formatDateTime_1.formatTime)(shift.startTime) }), (0, jsx_runtime_1.jsx)(ShiftInfoField_1.default, { label: "Duration", value: "".concat(shift.duration, " Hours") }), renderVolunteer()] }));
};
exports.default = ShiftInfo;
