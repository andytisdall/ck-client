"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var FileSuccess = function (_a) {
    var returnLink = _a.returnLink;
    var filesUploaded = (0, react_router_dom_1.useParams)().filesUploaded;
    var message = !filesUploaded
        ? 'Upload Successful.'
        : filesUploaded === '1'
            ? 'Successfully uploaded 1 file.'
            : "Successfully uploaded ".concat(filesUploaded, " files.");
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Success!" }), (0, jsx_runtime_1.jsx)("div", { className: "file-success", children: message }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: returnLink, children: (0, jsx_runtime_1.jsx)("button", { className: "nav-button", children: "Back to Onboarding Home" }) })] }));
};
exports.default = FileSuccess;
