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
var ScanBarcode_1 = require("./ScanBarcode");
var ClientInfo = function (_a) {
    var client = _a.client, setCcode = _a.setCcode;
    var _b = __read((0, react_1.useState)(client.cCode || ""), 2), code = _b[0], setCode = _b[1];
    var missingStyle = !code ? "doorfront-client-missing" : "";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "doorfront-client", children: [(0, jsx_runtime_1.jsxs)("div", { className: "doorfront-client-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "doorfront-client-label", children: "Long Barcode:" }), (0, jsx_runtime_1.jsx)("div", { className: "doorfront-client-label", children: "C-Code:" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "doorfront-client-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "doorfront-client-value", children: client.barcode }), (0, jsx_runtime_1.jsx)("input", { className: "doorfront-client-value ".concat(missingStyle), value: code, onChange: function (e) {
                            setCode(e.target.value);
                            setCcode((0, ScanBarcode_1.addZerosToCcode)(e.target.value));
                        } })] })] }));
};
exports.default = ClientInfo;
