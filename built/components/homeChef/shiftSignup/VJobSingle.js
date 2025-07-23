"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var VolunteerJob_1 = __importDefault(require("./VolunteerJob"));
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var VJobSingle = function () {
    var jobId = (0, react_router_dom_1.useParams)().jobId;
    var _a = (0, homeChefApi_1.useGetShiftsQuery)(), data = _a.data, isLoading = _a.isLoading;
    var jobs = data === null || data === void 0 ? void 0 : data.jobs;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    var job = jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === jobId; });
    if (!job) {
        return (0, jsx_runtime_1.jsx)("p", { children: "Fridge Not Found." });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "jobs-list", children: (0, jsx_runtime_1.jsx)(VolunteerJob_1.default, { job: job }) }));
};
exports.default = VJobSingle;
