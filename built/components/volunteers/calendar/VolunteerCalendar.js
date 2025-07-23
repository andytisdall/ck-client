"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_tz_1 = require("date-fns-tz");
var react_1 = require("react");
var CalendarShift_1 = __importDefault(require("./CalendarShift"));
var Calendar_1 = __importDefault(require("../../reusable/calendar/Calendar"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var volunteerApi_1 = require("../../../state/apis/volunteerApi/volunteerApi");
var jobs_1 = require("../../../state/apis/volunteerApi/jobs");
var config_1 = __importDefault(require("../config"));
var DriverCalendarShift_1 = __importDefault(require("./DriverCalendarShift"));
var KitchenCalendar = function (_a) {
    var contactId = _a.contactId, campaign = _a.campaign;
    var jobs = (0, jobs_1.useGetJobsQuery)({
        campaignId: campaign.id,
    }).data;
    var _b = (0, volunteerApi_1.useGetHoursQuery)({
        contactId: contactId,
        campaignId: campaign.id,
    }), hours = _b.data, isLoading = _b.isLoading;
    var shifts = jobs === null || jobs === void 0 ? void 0 : jobs.map(function (j) { return j.shifts; }).flat();
    var driverCampaign = campaign.id === config_1.default.deliveryDrivers.id;
    var Component = driverCampaign ? DriverCalendarShift_1.default : CalendarShift_1.default;
    var bookedJobs = hours
        ? Object.values(hours)
            .filter(function (h) { return h.status === "Confirmed"; })
            .map(function (h) { return h.shift; })
        : [];
    var shiftsByDate = (0, react_1.useMemo)(function () {
        var sortedShifts = {};
        if (shifts) {
            Object.values(shifts)
                .filter(function (shift) {
                var job = jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === shift.job; });
                return job === null || job === void 0 ? void 0 : job.active;
            })
                .forEach(function (shift) {
                var formattedTime = (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(shift.startTime, "America/Los_Angeles"), "yyyy-MM-dd");
                if (!sortedShifts[formattedTime]) {
                    sortedShifts[formattedTime] = [shift];
                }
                else {
                    sortedShifts[formattedTime].push(shift);
                }
            });
            return sortedShifts;
        }
    }, [shifts, jobs]);
    var renderShifts = function (date) {
        if (shiftsByDate && shiftsByDate[date]) {
            return shiftsByDate[date].map(function (sh, index) {
                var job = jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === sh.job; });
                if (!job) {
                    return (0, jsx_runtime_1.jsx)("div", { children: "Job not found." });
                }
                var jobBooked = bookedJobs.includes(sh.id);
                var bookedHours;
                if (jobBooked && hours) {
                    bookedHours = Object.values(hours).find(function (h) { return h.shift === sh.id && h.status === "Confirmed"; });
                }
                var getLinkUrl = function () {
                    if (jobBooked) {
                        if (bookedHours) {
                            return "../../../confirm/".concat(contactId, "/").concat(bookedHours.id);
                        }
                    }
                    else if (sh.open) {
                        return "../".concat(sh.id);
                    }
                };
                return ((0, jsx_runtime_1.jsx)(Component, { shift: sh, job: job, linkUrl: getLinkUrl(), index: index, children: jobBooked && ((0, jsx_runtime_1.jsx)("div", { className: "volunteers-calendar-checkmark", children: "\u2713 Signed Up" })) }, sh.id));
            });
        }
        else {
            return [];
        }
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    return (0, jsx_runtime_1.jsx)(Calendar_1.default, { renderItems: renderShifts });
};
exports.default = KitchenCalendar;
