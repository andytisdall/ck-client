"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Chart = function (_a) {
    var children = _a.children, title = _a.title;
    var _b = __read((0, react_1.useState)(false), 2), show = _b[0], setShow = _b[1];
    var openStyle = show ? 'cbo-report-open' : '';
    var arrow = show ? (0, jsx_runtime_1.jsx)("span", { children: "\u2193" }) : (0, jsx_runtime_1.jsx)("span", { children: "\u2192" });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "cbo-report ".concat(openStyle), children: [(0, jsx_runtime_1.jsxs)("h2", { className: "cbo-report-title", onClick: function () { return setShow(!show); }, children: [arrow, " ", title] }), show && (0, jsx_runtime_1.jsx)("div", { className: "cbo-dataset", children: children })] }));
};
exports.default = Chart;
