"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var AdminHome = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-home", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "user", children: "Create or Edit a User" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "restaurant", children: "Create or Edit a Restaurant" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "notifications", children: "Send a Push Notification" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "d4j", children: "Dining for Justice" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "../volunteer-check-in", children: "Volunteer Check-In" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "/doorfront", children: "Scan Barcode" })] }));
};
exports.default = AdminHome;
