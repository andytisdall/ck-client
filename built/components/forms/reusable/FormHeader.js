"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var FormHeader = function (_a) {
    var img = _a.img, title = _a.title, children = _a.children, spanish = _a.spanish;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-item", children: [!!img && (0, jsx_runtime_1.jsx)("img", { src: img, alt: "Form", className: "form-img" }), (0, jsx_runtime_1.jsx)("h1", { children: title }), (0, jsx_runtime_1.jsx)("div", { className: "form-content", children: children }), (0, jsx_runtime_1.jsx)("p", { className: "required", children: spanish ? '* Indica pregunta requerida' : '* Indicates required question' })] }));
};
exports.default = FormHeader;
