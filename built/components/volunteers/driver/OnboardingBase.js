"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var driver_1 = require("../../../state/apis/volunteerApi/driver");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var OnboardingBase = function () {
    var _a = (0, driver_1.useGetDriverQuery)(), driver = _a.data, isFetching = _a.isFetching;
    if (isFetching) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    var renderContent = function () {
        if (!driver) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding", children: [(0, jsx_runtime_1.jsx)("p", { children: "You must sign in to use this page." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/volunteers", children: (0, jsx_runtime_1.jsx)("button", { children: "Volunteers Home" }) })] }));
        }
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {});
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", { className: "volunteers-main-header volunteers-kitchen-header", children: "Delivery Drivers" }), renderContent()] }));
};
exports.default = OnboardingBase;
