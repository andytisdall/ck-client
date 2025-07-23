"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var EnterName = function (_a) {
    var firstName = _a.firstName, lastName = _a.lastName, setFirstName = _a.setFirstName, setLastName = _a.setLastName;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signin-field", children: [(0, jsx_runtime_1.jsx)("h4", { children: "Please enter your name for our records (in the future you'll only need to enter your email):" }), (0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signin-field-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "firstName", children: "First Name:" }), (0, jsx_runtime_1.jsx)("input", { autoFocus: true, type: "text", id: "firstName", required: true, value: firstName, onChange: function (e) { return setFirstName(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signin-field-item", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "lastName", children: "Last Name:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "lastName", required: true, value: lastName, onChange: function (e) { return setLastName(e.target.value); } })] })] }));
};
exports.default = EnterName;
