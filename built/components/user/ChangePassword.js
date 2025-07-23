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
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var errorSlice_1 = require("../../state/apis/slices/errorSlice");
var authApi_1 = require("../../state/apis/authApi");
var alertSlice_1 = require("../../state/apis/slices/alertSlice");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var ChangePassword = function () {
    var _a = __read((0, react_1.useState)(""), 2), password1 = _a[0], setPassword1 = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), password2 = _b[0], setPassword2 = _b[1];
    var user = (0, authApi_1.useGetUserQuery)().data;
    var _c = __read((0, authApi_1.useEditUserMutation)(), 2), editUser = _c[0], isLoading = _c[1].isLoading;
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleSubmit = function (e) {
        e.preventDefault();
        if (user) {
            if (password1 !== password2) {
                return dispatch((0, errorSlice_1.setError)({ message: "Passwords do not match" }));
            }
            editUser({
                userId: user.id,
                username: user.username,
                password: password1,
                salesforceId: user.salesforceId,
            })
                .unwrap()
                .then(function () {
                dispatch((0, alertSlice_1.setAlert)("You have changed your password"));
                navigate("/");
            });
            setPassword1("");
            setPassword2("");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Change Your Password" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password1", children: "New Password:" }), (0, jsx_runtime_1.jsx)("input", { name: "password1", type: "password", value: password1, required: true, onChange: function (e) { return setPassword1(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "user", children: "Re-Enter Password:" }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "password", value: password2, name: "password2", onChange: function (e) { return setPassword2(e.target.value); } }), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = ChangePassword;
