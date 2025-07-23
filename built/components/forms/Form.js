"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Form = function () {
    var headerImage = function () {
        return ((0, jsx_runtime_1.jsx)("img", { src: "/images/logos/ck-header.png", alt: "Community Kitchens", className: "form-item form-logo" }));
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "form-background", children: (0, jsx_runtime_1.jsxs)("div", { className: "form", children: [headerImage(), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }) }));
};
exports.default = Form;
