"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var date_fns_tz_1 = require("date-fns-tz");
var jobs_1 = require("../../../state/apis/volunteerApi/jobs");
var authApi_1 = require("../../../state/apis/authApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var ShiftList_1 = __importDefault(require("../shiftList/ShiftList"));
var config_1 = __importDefault(require("../config"));
var JobList = function (_a) {
    var campaign = _a.campaign;
    var _b = (0, jobs_1.useGetJobsQuery)({
        campaignId: campaign.id,
    }), jobs = _b.data, isLoading = _b.isLoading;
    var driver = campaign.id === config_1.default.deliveryDrivers.id;
    var volunteer = (0, react_redux_1.useSelector)(function (state) { return state.volunteer.volunteer; });
    var user = (0, authApi_1.useGetUserQuery)().data;
    var contactId = (volunteer === null || volunteer === void 0 ? void 0 : volunteer.id) || (user === null || user === void 0 ? void 0 : user.salesforceId);
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!jobs || !campaign || !contactId) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Could not find info." });
    }
    var visibleJobs = jobs.filter(function (j) {
        var filteredShifts = j.shifts.filter(function (shift) {
            return (0, date_fns_tz_1.utcToZonedTime)(shift.startTime, "America/Los_Angeles") > new Date() &&
                (!driver ? true : shift.carSizeRequired);
        });
        return j.active && filteredShifts.length;
    });
    if (!visibleJobs.length) {
        return (0, jsx_runtime_1.jsx)("div", { children: "No upcoming shifts are available for sign up." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "volunteers-signup-btns", children: "Positions Available" }), visibleJobs.map(function (j) {
                return ((0, jsx_runtime_1.jsx)(ShiftList_1.default, { campaign: campaign, job: j, contactId: contactId }, j.id));
            }), driver && ((0, jsx_runtime_1.jsx)("div", { className: "volunteers-job", children: (0, jsx_runtime_1.jsx)("h3", { children: "More driver opportunities coming soon" }) }))] }));
};
exports.default = JobList;
