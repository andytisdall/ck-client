"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var date_fns_1 = require("date-fns");
var authApi_1 = require("../../state/apis/authApi");
require("../header/Header.css");
require("./volunteerCheckIn.css");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var CheckInVolunteerBase = function () {
    var _a = (0, authApi_1.useGetUserQuery)(), user = _a.data, isLoading = _a.isLoading;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!(user === null || user === void 0 ? void 0 : user.admin)) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "main check-in", children: (0, jsx_runtime_1.jsx)("h2", { children: "You do not have permission to use this page." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main check-in", children: [(0, jsx_runtime_1.jsxs)("div", { className: "check-in-header-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "check-in-header", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/logos/ck-logo.png", alt: "ck logo", className: "header-logo" }), (0, jsx_runtime_1.jsx)("h1", { children: "Volunteer Check-In" })] }), (0, jsx_runtime_1.jsx)("p", { children: (0, date_fns_1.format)(new Date(), 'eeee, M/d/yy') })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
};
exports.default = CheckInVolunteerBase;
