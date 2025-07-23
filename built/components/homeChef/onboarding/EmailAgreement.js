"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var signApi_1 = require("../../../state/apis/signApi");
var EmailAgreement = function () {
    (0, signApi_1.useRequestHomeChefAgreementQuery)();
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "The Home Chef agreement will be emailed to you shortly." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "..", children: (0, jsx_runtime_1.jsx)("button", { children: "Back" }) })] }));
};
exports.default = EmailAgreement;
