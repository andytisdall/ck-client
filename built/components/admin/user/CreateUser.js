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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var userApi_1 = require("../../../state/apis/authApi/userApi");
var errorSlice_1 = require("../../../state/apis/slices/errorSlice");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var CreateUser = function () {
    var _a = __read((0, react_1.useState)(''), 2), username = _a[0], setUsername = _a[1];
    var _b = __read((0, react_1.useState)(''), 2), salesforceId = _b[0], setSalesforceId = _b[1];
    var _c = __read((0, react_1.useState)(''), 2), password1 = _c[0], setPassword1 = _c[1];
    var _d = __read((0, react_1.useState)(''), 2), password2 = _d[0], setPassword2 = _d[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var _e = __read((0, userApi_1.useCreateUserMutation)(), 1), createUser = _e[0];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (password1 !== password2) {
            return dispatch((0, errorSlice_1.setError)('Passwords do not match'));
        }
        createUser({ username: username, password: password1, salesforceId: salesforceId })
            .unwrap()
            .then(function () {
            dispatch((0, alertSlice_1.setAlert)('User Created'));
            setUsername('');
            setSalesforceId('');
            setPassword1('');
            setPassword2('');
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Create a User" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "admin-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Username:" }), (0, jsx_runtime_1.jsx)("input", { name: "name", type: "text", value: username, required: true, onChange: function (e) { return setUsername(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "salesforceId", children: "Salesforce ID:" }), (0, jsx_runtime_1.jsx)("input", { name: "salesforceId", type: "text", value: salesforceId, onChange: function (e) { return setSalesforceId(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "password1", children: "Password:" }), (0, jsx_runtime_1.jsx)("input", { name: "password1", type: "password", value: password1, required: true, onChange: function (e) { return setPassword1(e.target.value); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "user", children: "Re-Enter Password:" }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "password", value: password2, name: "password2", onChange: function (e) { return setPassword2(e.target.value); } }), (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = CreateUser;
