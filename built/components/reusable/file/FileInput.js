"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./FileInput.css");
var FileInput = function (_a) {
    var file = _a.file, setFile = _a.setFile, label = _a.label;
    var processFile = function (e) {
        var files = e.target.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };
    var displayName = function () {
        if (typeof file !== "string") {
            return (file === null || file === void 0 ? void 0 : file.name.slice(0, 15)) + "...";
        }
    };
    var style = file ? "file-present" : "";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "file-upload ".concat(style), children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: label, className: "file-label", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "file-input-container", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: label, className: "file-input", children: "choose file" }), file ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "file-name", children: displayName() }), (0, jsx_runtime_1.jsx)("div", { onClick: function () { return setFile(undefined); }, className: "file-delete", children: "x" })] })) : null] }), (0, jsx_runtime_1.jsx)("input", { type: "file", id: label, className: "file-hidden", onChange: processFile })] }));
};
exports.default = FileInput;
