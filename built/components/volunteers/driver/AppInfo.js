"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var AppInfo = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-detail driver-app-info", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/phone-icon.png", alt: "phone", className: "driver-app-phone-icon" }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-app-text", children: [(0, jsx_runtime_1.jsx)("h4", { children: "Announce your delivery with the CK Text Service" }), (0, jsx_runtime_1.jsx)("p", { children: "Use our mobile app to send a text message to our list of subscribers and let them know about the available meals." }), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/home-chef-app", className: "retro-link", children: "Click here to download the app" }) }), (0, jsx_runtime_1.jsx)("p", { children: "OR" }), (0, jsx_runtime_1.jsx)("p", { children: "Scan the code below to download the app on your phone." }), (0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/home-chef-app-qr-code.png", alt: "qr code", className: "driver-app-qr-code" })] })] }));
};
exports.default = AppInfo;
