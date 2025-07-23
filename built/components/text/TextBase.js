"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var authApi_1 = require("../../state/apis/authApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var Text = function () {
    var _a = (0, authApi_1.useGetUserQuery)(), user = _a.data, isLoading = _a.isLoading;
    var permitted = (user === null || user === void 0 ? void 0 : user.admin) || (user === null || user === void 0 ? void 0 : user.busDriver);
    var renderSignIn = function () {
        return (0, jsx_runtime_1.jsx)("h3", { children: "You must have the proper permissions to access this page." });
    };
    var renderTextBase = function () {
        if (isLoading) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        return permitted ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) : renderSignIn();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main text-home", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-header", children: "Text Service" }), renderTextBase()] }));
};
exports.default = Text;
