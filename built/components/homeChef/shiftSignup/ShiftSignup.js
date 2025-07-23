"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var style_1 = require("../../../utils/style");
require("./ShiftSignup.css");
var authApi_1 = require("../../../state/apis/authApi");
var ShiftSignup = function () {
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var renderInactive = function () {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../onboarding", className: "retro-link", children: "You must finish the onboarding process before you can sign up for Home Chef deliveries." }) }));
    };
    var renderSignup = function () {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "shift-signup-header", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Town Fridge Sign Up" }), (0, jsx_runtime_1.jsxs)("div", { className: "shift-signup-links", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: "list", className: style_1.navLink, children: "List View" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: "calendar", className: style_1.navLink, children: "Calendar View" })] })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
    };
    var renderContent = function () {
        if (!userInfo || userInfo.homeChefStatus !== 'Active') {
            return renderInactive();
        }
        return renderSignup();
    };
    return (0, jsx_runtime_1.jsx)("div", { className: "shift-signup", children: renderContent() });
};
exports.default = ShiftSignup;
