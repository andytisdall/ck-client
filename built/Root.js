"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var google_1 = require("@react-oauth/google");
var store_1 = require("./state/store");
var clientId = '385802469502-061cv1crj954fcp56kthk40u918eu1ot.apps.googleusercontent.com';
var Root = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(google_1.GoogleOAuthProvider, { clientId: clientId, children: (0, jsx_runtime_1.jsx)(react_redux_1.Provider, { store: store_1.store, children: children }) }));
};
exports.default = Root;
