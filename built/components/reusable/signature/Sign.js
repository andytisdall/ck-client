"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var signApi_1 = require("../../../state/apis/signApi");
var Loading_1 = __importDefault(require("../loading/Loading"));
var Sign = function () {
    var _a = (0, react_router_dom_1.useParams)(), doc = _a.doc, contactId = _a.contactId, hoursId = _a.hoursId;
    var _b = (0, signApi_1.useGetSigningUrlQuery)({
        doc: doc,
        contactId: contactId,
        hoursId: hoursId,
    }), data = _b.data, isLoading = _b.isLoading;
    if (data) {
        if (data.signingUrl) {
            window.location.href = data.signingUrl;
        }
        else {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "You have already signed this document." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../..", children: (0, jsx_runtime_1.jsx)("button", { children: "Back" }) })] }));
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Sign this Document" }), (0, jsx_runtime_1.jsx)("p", { children: "You will be redirected to sign." }), isLoading && (0, jsx_runtime_1.jsx)(Loading_1.default, {})] }));
};
exports.default = Sign;
