"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var ShiftInfoField = function (_a) {
    var label = _a.label, value = _a.value, notes = _a.notes;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-detail-field", children: [(0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-detail-field-title", children: [label, ":"] }), (0, jsx_runtime_1.jsxs)("div", { children: [value, !!notes && ((0, jsx_runtime_1.jsx)("div", { className: "volunteers-shift-detail-field-notes", children: notes }))] })] }));
};
exports.default = ShiftInfoField;
