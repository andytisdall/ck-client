"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var SalesforceNotFound = function () {
    return ((0, jsx_runtime_1.jsx)("div", { className: "main error-page", children: (0, jsx_runtime_1.jsxs)("div", { className: "unauthorized-text", children: ["There was a problem finding your information. Please email", ' ', (0, jsx_runtime_1.jsx)("a", { href: "mailto:andy@ckoakland.org", children: "andy@ckoakland.org" }), " to restore your access to the CK portal."] }) }));
};
exports.default = SalesforceNotFound;
