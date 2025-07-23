"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./DownloadFile.css");
var DownloadFile = function (_a) {
    var children = _a.children, filename = _a.filename;
    return ((0, jsx_runtime_1.jsxs)("a", { href: "/images/".concat(filename), download: true, className: "download", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/icons/download.svg", alt: "download pdf", className: "download-icon" }), (0, jsx_runtime_1.jsx)("p", { children: children })] }));
};
exports.default = DownloadFile;
