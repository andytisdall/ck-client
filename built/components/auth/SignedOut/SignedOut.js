"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var SignIn_1 = __importDefault(require("./SignIn"));
var GoogleSignIn_1 = __importDefault(require("./GoogleSignIn"));
var SignedOut = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(SignIn_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "header-auth-google", children: [(0, jsx_runtime_1.jsx)("p", { className: "header-auth-text", children: "OR" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(GoogleSignIn_1.default, {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/forgot-password", children: (0, jsx_runtime_1.jsx)("div", { className: "forgot-password", children: "Forgot Password?" }) })] })] })] }));
};
exports.default = SignedOut;
