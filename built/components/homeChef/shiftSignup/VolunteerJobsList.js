"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var VolunteerJob_1 = __importDefault(require("./VolunteerJob"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
require("./VolunteerJob.css");
var VolunteerJobsList = function () {
    var _a = (0, homeChefApi_1.useGetShiftsQuery)(), data = _a.data, isLoading = _a.isLoading;
    var jobs = data === null || data === void 0 ? void 0 : data.jobs;
    var renderFridges = function (fridges) {
        return fridges
            .filter(function (job) { return job.ongoing; })
            .sort(function (a) { return (a.active ? -1 : 1); })
            .map(function (job) {
            return (0, jsx_runtime_1.jsx)(VolunteerJob_1.default, { job: job }, job.id);
        });
    };
    var renderRegions = function () {
        if (!jobs) {
            return (0, jsx_runtime_1.jsx)("div", { children: "Could not retrieve fridge info." });
        }
        return ((0, jsx_runtime_1.jsxs)("div", { className: "home-chef-fridges", children: [(0, jsx_runtime_1.jsxs)("div", { className: "home-chef-fridges-region", children: [(0, jsx_runtime_1.jsx)("h2", { className: "region-name", children: "East Oakland" }), (0, jsx_runtime_1.jsx)("div", { children: renderFridges(jobs.filter(function (fridge) { return fridge.region === "East Oakland"; })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "home-chef-fridges-region", children: [(0, jsx_runtime_1.jsx)("h2", { className: "region-name", children: "West Oakland" }), (0, jsx_runtime_1.jsx)("div", { children: renderFridges(jobs.filter(function (fridge) { return fridge.region === "West Oakland"; })) })] })] }));
    };
    return isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : renderRegions();
};
exports.default = VolunteerJobsList;
