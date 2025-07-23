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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var date_fns_tz_1 = require("date-fns-tz");
require("./ChefShifts.css");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var authApi_1 = require("../../../state/apis/authApi");
var ChefShifts = function () {
    var _a = __read((0, react_1.useState)(true), 2), upcomingExpand = _a[0], setUpcomingExpand = _a[1];
    var _b = __read((0, react_1.useState)(true), 2), pastExpand = _b[0], setPastExpand = _b[1];
    var data = (0, homeChefApi_1.useGetShiftsQuery)().data;
    var jobs = data === null || data === void 0 ? void 0 : data.jobs;
    var hours = (0, homeChefApi_1.useGetHomeChefHoursQuery)().data;
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var renderHour = function (hour) {
        var job = jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === hour.job; });
        if (job) {
            return ((0, jsx_runtime_1.jsxs)("li", { className: "chef-hours", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chef-hours-title", children: [(0, jsx_runtime_1.jsx)("div", { className: "chef-hours-date", children: (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(hour.time, "America/Los_Angeles"), "eee, M/d/yy") }), (0, jsx_runtime_1.jsx)("p", { children: job.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "chef-hours-info", children: [(0, jsx_runtime_1.jsxs)("span", { className: "chef-hours-meals", children: [hour.mealCount || 0, " Meals"] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "edit-shift/".concat(hour.id), className: "chef-hours-edit", children: "edit" })] })] }, hour.id));
        }
    };
    var sortedHours = (0, react_1.useMemo)(function () {
        if (hours) {
            return __spreadArray([], __read(Object.values(hours)), false).sort(function (a, b) {
                return a.time > b.time ? 1 : -1;
            });
        }
    }, [hours]);
    var totalMeals = (0, react_1.useMemo)(function () {
        if (hours) {
            return Object.values(hours)
                .filter(function (h) { return h.status === "Completed"; })
                .reduce(function (total, current) { return total + parseInt(current.mealCount || "0"); }, 0);
        }
    }, [hours]);
    var renderHours = function (period) {
        if (hours && jobs && sortedHours) {
            var status_1 = "";
            var hoursArray = [];
            if (period === "past") {
                hoursArray = __spreadArray([], __read(sortedHours), false).reverse();
                status_1 = "Completed";
            }
            else {
                hoursArray = sortedHours;
                status_1 = "Confirmed";
            }
            var renderedList = hoursArray
                .filter(function (h) { return h.status === status_1; })
                .map(function (hour) {
                return renderHour(hour);
            });
            if (renderedList.length) {
                return (0, jsx_runtime_1.jsx)("ul", { children: renderedList });
            }
            else {
                return (0, jsx_runtime_1.jsx)("p", { children: "No Shifts" });
            }
        }
    };
    if (!hours || !jobs) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    var upcomingExpanded = upcomingExpand ? "expanded" : "";
    var pastExpanded = pastExpand ? "expanded" : "";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "chef-shifts", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chef-shifts-list", children: [(userInfo === null || userInfo === void 0 ? void 0 : userInfo.firstName) ? ((0, jsx_runtime_1.jsxs)("h2", { children: [userInfo.firstName, "'s Town Fridge Deliveries"] })) : null, totalMeals && totalMeals > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "chef-total-meals", children: ["You have delivered ", totalMeals, " total meals!"] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "job-name", onClick: function () { return setUpcomingExpand(!upcomingExpand); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "expand-btn ".concat(upcomingExpanded), children: "\u2192" }), (0, jsx_runtime_1.jsx)("h3", { children: "Upcoming Deliveries" })] }), (0, jsx_runtime_1.jsx)("div", { className: "chef-hours-list ".concat(!upcomingExpand ? "chef-hours-list-closed" : ""), children: upcomingExpand && renderHours("upcoming") }), (0, jsx_runtime_1.jsxs)("div", { className: "job-name", onClick: function () { return setPastExpand(!pastExpand); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "expand-btn ".concat(pastExpanded), children: "\u2192" }), (0, jsx_runtime_1.jsx)("h3", { children: "Past Deliveries" })] }), (0, jsx_runtime_1.jsx)("div", { className: "chef-hours-list ".concat(!pastExpand ? "chef-hours-list-closed" : ""), children: pastExpand && renderHours("past") })] }), (0, jsx_runtime_1.jsxs)("div", { className: "chef-images", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../signup/list", children: (0, jsx_runtime_1.jsx)("button", { className: "chef-signup-link", children: "Sign Up to Deliver Meals" }) }), (0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/chef-shifts.jpeg", alt: "Home Chef meals ready to go" })] })] }));
};
exports.default = ChefShifts;
