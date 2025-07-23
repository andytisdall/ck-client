"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var authApi_1 = require("../../state/apis/authApi");
require("./Doorfront.css");
require("../header/Header.css");
var DoorfrontBase = function () {
    var user = (0, authApi_1.useGetUserQuery)().data;
    if (!(user === null || user === void 0 ? void 0 : user.admin)) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "main doorfront-base", children: (0, jsx_runtime_1.jsx)("h2", { children: "You do not have permission to use this page." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main doorfront-base", children: [(0, jsx_runtime_1.jsx)("div", { className: "check-in-header-container", children: (0, jsx_runtime_1.jsx)("h1", { children: "CK Kitchen Doorfront" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
};
exports.default = DoorfrontBase;
