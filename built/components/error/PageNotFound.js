"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Header_1 = __importDefault(require("../header/Header"));
var PageNotFound = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "main error-page", children: [(0, jsx_runtime_1.jsx)("h1", { children: "This page does not exist on the Community Kitchens portal." }), (0, jsx_runtime_1.jsxs)("p", { children: ["If you want to report an issue, please email", ' ', (0, jsx_runtime_1.jsx)("a", { href: "mailto:andy@ckoakland.org", children: "andy@ckoakland.org" })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsx)("button", { className: "nav-button", children: "Community Kitchens Home" }) })] })] }));
};
exports.default = PageNotFound;
