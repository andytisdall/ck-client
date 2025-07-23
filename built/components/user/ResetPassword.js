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
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var authApi_1 = require("../../state/apis/authApi");
var errorSlice_1 = require("../../state/apis/slices/errorSlice");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
require("./User.css");
var ResetPassword = function () {
    var _a = __read((0, react_1.useState)(''), 2), password1 = _a[0], setPassword1 = _a[1];
    var _b = __read((0, react_1.useState)(''), 2), password2 = _b[0], setPassword2 = _b[1];
    var token = (0, react_router_dom_1.useParams)().token;
    var _c = __read((0, authApi_1.useResetPasswordMutation)(), 2), resetPassword = _c[0], resetPasswordResult = _c[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    if (!token) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Invalid URL." });
    }
    var onSubmit = function (e) {
        e.preventDefault();
        if (password1 !== password2) {
            return dispatch((0, errorSlice_1.setError)('Passwords do not match'));
        }
        resetPassword({ password: password1, token: token });
    };
    if (resetPasswordResult.isSuccess) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "main user", children: [(0, jsx_runtime_1.jsx)("p", { children: "You successfully reset your password." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsx)("button", { children: "Home" }) })] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "main user", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password1", children: "New Password:" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password1", value: password1, required: true, onChange: function (e) { return setPassword1(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "password1", children: "Re-enter Password:" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password2", required: true, value: password2, onChange: function (e) { return setPassword2(e.target.value); } }), resetPasswordResult.isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "submit" })] }) }));
};
exports.default = ResetPassword;
