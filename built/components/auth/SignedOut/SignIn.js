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
require("./SignIn.css");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var authApi_1 = require("../../../state/apis/authApi");
var SignIn = function () {
    var _a = __read((0, react_1.useState)(''), 2), username = _a[0], setUsername = _a[1];
    var _b = __read((0, react_1.useState)(''), 2), password = _b[0], setPassword = _b[1];
    var _c = __read((0, authApi_1.useSignInMutation)(), 2), signIn = _c[0], signInResult = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleSubmit = function (e) {
        e.preventDefault();
        signIn({ username: username, password: password })
            .unwrap()
            .then(function (user) {
            if (!user.active) {
                navigate('/user/change-password');
            }
        });
    };
    if (signInResult.isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    return ((0, jsx_runtime_1.jsxs)("form", { className: "signin", onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "signin-button", children: [(0, jsx_runtime_1.jsx)("div", { className: "signin-title", children: "Sign In" }), (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "signin-fields", children: [(0, jsx_runtime_1.jsx)("input", { name: "username", className: "input", type: "text", placeholder: "Username", value: username, onChange: function (e) { return setUsername(e.target.value); } }), (0, jsx_runtime_1.jsx)("input", { name: "password", className: "input", placeholder: "Password", type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); } })] })] }));
};
exports.default = SignIn;
