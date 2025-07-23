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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_fns_tz_1 = require("date-fns-tz");
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var react_router_dom_1 = require("react-router-dom");
require("./VolunteerJob.css");
var VolunteerJob = function (_a) {
    var job = _a.job;
    var _b = __read((0, react_1.useState)(false), 2), expand = _b[0], setExpand = _b[1];
    var data = (0, homeChefApi_1.useGetShiftsQuery)().data;
    var shifts = data === null || data === void 0 ? void 0 : data.shifts;
    var renderShifts = function () {
        if (shifts) {
            var jobShifts = Object.values(shifts).filter(function (sh) { return sh.job === job.id; });
            return jobShifts
                .sort(function (a, b) { return (a.startTime > b.startTime ? 1 : -1); })
                .map(function (shift) {
                return ((0, jsx_runtime_1.jsxs)("div", { className: "job-listing", children: [shift.open ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../shift/".concat(shift.id), children: (0, jsx_runtime_1.jsx)("button", { children: "Sign Up" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "job-full", children: "full" })), (0, jsx_runtime_1.jsx)("div", { className: "job-date ".concat(shift.open ? "" : "job-date-full"), children: (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(shift.startTime, "America/Los_Angeles"), "M/d/yy") }), (0, jsx_runtime_1.jsx)("div", { className: "job-time ".concat(shift.open ? "" : "job-date-full"), children: (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(shift.startTime, "America/Los_Angeles"), "eeee") })] }, shift.id));
            });
        }
    };
    var expanded = expand ? "expanded" : "";
    var inactive = job.active ? "" : "job-name-inactive";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "job-container", onClick: function () {
            if (job.active) {
                setExpand(!expand);
            }
        }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "job-name ".concat(inactive), children: [job.active && (0, jsx_runtime_1.jsx)("div", { className: "expand-btn ".concat(expanded), children: "\u2192" }), (0, jsx_runtime_1.jsx)("div", { children: job.name }), job.active ? ((0, jsx_runtime_1.jsx)("div", { className: "job-location", children: job.location })) : ((0, jsx_runtime_1.jsx)("div", { className: "job-disabled", children: "Out of Service" }))] }), job.active && job.notes && ((0, jsx_runtime_1.jsx)("div", { className: "job-notes", children: (0, jsx_runtime_1.jsx)("p", { children: job.notes }) })), (0, jsx_runtime_1.jsx)("div", { className: "shift-list ".concat(expanded ? "" : "closed"), children: expand && renderShifts() })] }));
};
exports.default = VolunteerJob;
