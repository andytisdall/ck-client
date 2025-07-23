"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var authApi_1 = require("../../state/apis/authApi");
var Loading_1 = __importDefault(require("./../reusable/loading/Loading"));
var SignedIn_1 = __importDefault(require("./../auth/SignedIn/SignedIn"));
var SignedOut_1 = __importDefault(require("./../auth/SignedOut/SignedOut"));
var HeaderMenu = function (_a) {
    var menuOpen = _a.menuOpen, setMenuOpen = _a.setMenuOpen;
    var _b = (0, authApi_1.useGetUserQuery)(), data = _b.data, isFetching = _b.isFetching;
    var renderMenuOpen = function () {
        return ((0, jsx_runtime_1.jsx)("div", { className: "header-right", children: (0, jsx_runtime_1.jsx)("div", { className: "header-auth", children: data ? (0, jsx_runtime_1.jsx)(SignedIn_1.default, {}) : (0, jsx_runtime_1.jsx)(SignedOut_1.default, {}) }) }));
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isFetching ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/icons/" + (menuOpen ? "close.svg" : "burger-menu.svg"), alt: "User Menu", className: "burger-menu-img", onClick: function () { return setMenuOpen(function (current) { return !current; }); } }), menuOpen && renderMenuOpen()] })) }));
};
exports.default = HeaderMenu;
