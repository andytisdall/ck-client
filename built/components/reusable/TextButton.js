"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
require("./TextButton.css");
var TextButton = function (_a) {
    var to = _a.to, buttonText = _a.buttonText, descriptionText = _a.descriptionText, _b = _a.outside, outside = _b === void 0 ? false : _b;
    var contents = function () {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-button-link text-button-width", children: buttonText }), (0, jsx_runtime_1.jsx)("div", { className: "text-button-description", children: descriptionText })] }));
    };
    if (!outside) {
        return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "text-button", to: to, children: contents() }));
    }
    else {
        return ((0, jsx_runtime_1.jsx)("a", { className: "text-button", href: to, target: "blank", children: contents() }));
    }
};
exports.default = TextButton;
