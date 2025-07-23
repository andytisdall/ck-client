"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var renderWithFallback_1 = __importDefault(require("../reusable/loading/renderWithFallback"));
var authApi_1 = require("../../state/apis/authApi");
var HomeChefStatus_1 = __importDefault(require("./HomeChefStatus"));
var HomeChefNotSignedIn_1 = __importDefault(require("./HomeChefNotSignedIn"));
var HomeChef = function () {
    var _a = (0, authApi_1.useGetUserInfoQuery)(), data = _a.data, isLoading = _a.isLoading;
    var userInfo = data;
    var renderStatus = function () {
        if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) !== "Active") {
            return (0, jsx_runtime_1.jsx)(HomeChefStatus_1.default, {});
        }
    };
    var renderHomeChef = function () {
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderStatus(), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
        }
        else {
            return (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(HomeChefNotSignedIn_1.default, {}));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main home-chef", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/home-chef", children: (0, jsx_runtime_1.jsx)("img", { src: "/images/home-chef/home-chef-header.png", className: "home-chef-header", alt: "home chef header" }) }), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : renderHomeChef()] }));
};
exports.default = HomeChef;
