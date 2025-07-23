"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_tz_1 = require("date-fns-tz");
var react_1 = require("react");
var volunteerApi_1 = require("../../../state/apis/volunteerApi/volunteerApi");
var ShiftListItem_1 = __importDefault(require("./ShiftListItem"));
var ShiftList = function (_a) {
    var contactId = _a.contactId, job = _a.job, campaign = _a.campaign;
    var hours = (0, volunteerApi_1.useGetHoursQuery)({
        campaignId: campaign.id,
        contactId: contactId,
    }).data;
    var shifts = job.shifts;
    var sortedShifts = (0, react_1.useMemo)(function () {
        return shifts
            .filter(function (shift) {
            return (0, date_fns_tz_1.utcToZonedTime)(shift.startTime, "America/Los_Angeles") > new Date();
        })
            .sort(function (a, b) { return (new Date(a.startTime) > new Date(b.startTime) ? 1 : -1); });
    }, [shifts]);
    var bookedJobs = !hours
        ? []
        : hours.filter(function (h) { return h.status === "Confirmed"; }).map(function (h) { return h.shift; });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-job", children: [(0, jsx_runtime_1.jsx)("h3", { children: job.name }), (0, jsx_runtime_1.jsx)("p", { children: job.description }), sortedShifts.map(function (shift) {
                var jobBooked = bookedJobs.includes(shift.id);
                var bookedHours;
                if (jobBooked && hours) {
                    bookedHours = hours.find(function (h) { return h.shift === shift.id && h.status === "Confirmed"; });
                }
                return ((0, jsx_runtime_1.jsx)(ShiftListItem_1.default, { shift: shift, contactId: contactId, bookedHoursId: bookedHours === null || bookedHours === void 0 ? void 0 : bookedHours.id, campaign: campaign }, shift.id));
            })] }));
};
exports.default = ShiftList;
