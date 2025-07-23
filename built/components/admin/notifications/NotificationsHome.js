"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var NotificationsHome = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "home-chef", children: "Send a push notification to Home Chef app users" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link admin-home-btn", to: "d4j", children: "Send a push notification to Dining for Justice app users" })] }));
};
exports.default = NotificationsHome;
