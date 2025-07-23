"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var EnterEmail = function (_a) {
    var email = _a.email, setEmail = _a.setEmail;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signin-field", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Enter your email" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email:" }), (0, jsx_runtime_1.jsx)("input", { className: "volunteers-email-field", type: "email", id: "email", required: true, value: email, onChange: function (e) { return setEmail(e.target.value); } })] }));
};
exports.default = EnterEmail;
