"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var authApi_1 = require("../../state/apis/authApi");
var AdminBase = function () {
    var user = (0, authApi_1.useGetUserQuery)().data;
    var renderForbidden = function () {
        return (0, jsx_runtime_1.jsx)("h3", { children: "You must be an admin to access this page." });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main admin", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-header", children: "Admin" }), user && user.admin && (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}), (!user || !user.admin) && renderForbidden()] }));
};
exports.default = AdminBase;
