"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var date_fns_tz_1 = require("date-fns-tz");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var Confirmation = function () {
    var hoursId = (0, react_router_dom_1.useParams)().hoursId;
    var hours = (0, homeChefApi_1.useGetHomeChefHoursQuery)().data;
    var data = (0, homeChefApi_1.useGetShiftsQuery)().data;
    var jobs = data === null || data === void 0 ? void 0 : data.jobs;
    var hour = hours && hoursId ? hours[hoursId] : null;
    var renderShiftDetails = function () {
        var job = jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === (hour === null || hour === void 0 ? void 0 : hour.job); });
        if (hour && job) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "hc-confirm-details", children: [(0, jsx_runtime_1.jsx)("p", { children: "You have successfully signed up for this shift:" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { className: "hc-confirm-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "hc-confirm-title", children: "Date:" }), ' ', (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(hour.time, 'America/Los_Angeles'), 'eeee, M/d/yy')] }), (0, jsx_runtime_1.jsxs)("li", { className: "hc-confirm-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "hc-confirm-title", children: "Fridge:" }), " ", job.name] }), (0, jsx_runtime_1.jsxs)("li", { className: "hc-confirm-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "hc-confirm-title", children: "Location:" }), " ", job.location] }), (0, jsx_runtime_1.jsxs)("li", { className: "hc-confirm-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "hc-confirm-title", children: "Number of Meals:" }), ' ', hour.mealCount] })] }), (0, jsx_runtime_1.jsx)("p", { children: "You have been sent an email with this information." })] }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)("div", { className: "hc-confirm-details", children: "Could not find the details of this shift." }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Home Chef Sign Up Confirmation" }), !jobs || !hours ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : renderShiftDetails(), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/home-chef/signup/list", children: (0, jsx_runtime_1.jsx)("button", { className: "hc-confirm-button", children: "Sign Up for More Shifts" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/home-chef/chef", className: "hc-confirm-button", children: (0, jsx_runtime_1.jsx)("button", { className: "hc-confirm-button", children: "See your future and past shifts" }) })] }));
};
exports.default = Confirmation;
