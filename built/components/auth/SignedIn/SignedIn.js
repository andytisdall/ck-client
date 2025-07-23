"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ConnectGoogle_1 = __importDefault(require("./../../user/ConnectGoogle"));
var authApi_1 = require("../../../state/apis/authApi");
var SignedIn = function () {
    var _a = __read((0, react_1.useState)(false), 2), showGoogleSignin = _a[0], setShowGoogleSignin = _a[1];
    var _b = __read((0, authApi_1.useSignOutMutation)(), 1), signOut = _b[0];
    var data = (0, authApi_1.useGetUserQuery)().data;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return signOut(); }, children: "Sign Out" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/user", className: "user-link", children: data === null || data === void 0 ? void 0 : data.username }), !(data === null || data === void 0 ? void 0 : data.googleId) &&
                        (showGoogleSignin ? ((0, jsx_runtime_1.jsx)(ConnectGoogle_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { onClick: function () { return setShowGoogleSignin(true); }, className: "retro-link forgot-password", children: "Connect your Google account" })))] })] }));
};
exports.default = SignedIn;
