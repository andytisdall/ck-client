"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var authApi_1 = require("../../state/apis/authApi");
var UserHome = function () {
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var _a = (0, authApi_1.useGetUserQuery)(), user = _a.data, isLoading = _a.isLoading;
    var renderHomeChef = function () {
        var status = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) === "Active" ? "Active" : "Not Yet Active";
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) {
            return ((0, jsx_runtime_1.jsxs)("p", { children: ["Your Home Chef Status: ", (0, jsx_runtime_1.jsx)("strong", { children: status })] }));
        }
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!user) {
        return (0, jsx_runtime_1.jsx)("div", { children: "No user found." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["You are logged in as ", (0, jsx_runtime_1.jsx)("strong", { children: user.username })] }), renderHomeChef()] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: "2rem", display: "flex" }, children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link", to: "change-password", children: "Change Password" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button-link", to: "change-username", children: "Change Username" })] })] }));
};
exports.default = UserHome;
