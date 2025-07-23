"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var authApi_1 = require("../../state/apis/authApi");
var User = function () {
    var user = (0, authApi_1.useGetUserQuery)().data;
    if (!user) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "main user", children: "You must be signed in to access this page." }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main user", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-header", children: "User" }), (0, jsx_runtime_1.jsx)("div", { className: "create-main", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) })] }));
};
exports.default = User;
