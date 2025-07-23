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
exports.addZerosToCcode = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_barcode_scanner_1 = require("react-barcode-scanner");
require("react-barcode-scanner/polyfill");
var addZerosToCcode = function (cCode) {
    var id = cCode.split("C")[1];
    if (id) {
        while (id.length < 8) {
            id = "0" + id;
        }
        return "C" + id;
    }
    return cCode;
};
exports.addZerosToCcode = addZerosToCcode;
var ScanBarcode = function () {
    var _a = __read((0, react_1.useState)(""), 2), clientId = _a[0], setClientId = _a[1];
    var _b = __read((0, react_1.useState)("external"), 2), entryType = _b[0], setEntryType = _b[1];
    var scannerInputRef = (0, react_1.useRef)(null);
    var navigate = (0, react_router_dom_1.useNavigate)();
    // manually entered (missing 0s)
    // scanned with camera or scanner
    // scanned with C code
    // scanned with long code
    var processScan = function (scanValue) {
        if (scanValue.includes("C")) {
            var id = scanValue.replace(/[^a-zA-Z0-9 ]/g, "");
            navigate(id);
        }
        else {
            navigate(scanValue);
        }
    };
    var submitManual = function () {
        var id = (0, exports.addZerosToCcode)(clientId);
        navigate(id);
    };
    var onSubmit = function (e) {
        var _a;
        e.preventDefault();
        if (entryType === "manual") {
            return submitManual();
        }
        if (entryType === "external") {
            var scannerInputValue = (_a = scannerInputRef.current) === null || _a === void 0 ? void 0 : _a.value;
            if (scannerInputValue) {
                return processScan(scannerInputValue);
            }
        }
        if (entryType === "camera") {
            return processScan(clientId);
        }
    };
    var getMode = function () {
        if (entryType === "manual") {
            return "Manual Entry";
        }
        if (entryType === "external") {
            return "External Scanner";
        }
        if (entryType === "camera") {
            return "Built-In Camera";
        }
    };
    var renderMode = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Scan Mode:" }), " ", getMode()] }));
    };
    var renderCameraScanner = function () {
        return ((0, jsx_runtime_1.jsx)("div", { className: "doorfront-camera-scanner", children: (0, jsx_runtime_1.jsx)(react_barcode_scanner_1.BarcodeScanner, { options: { formats: ["code_128"] }, onCapture: function (detected) {
                    var id = detected[0].rawValue.replace(/[^a-zA-Z0-9 ]/g, "");
                    navigate(id);
                } }) }));
    };
    var renderManualEntry = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Client ID:" }), (0, jsx_runtime_1.jsx)("input", { value: clientId, onChange: function (e) { return setClientId(e.target.value.toUpperCase()); }, autoFocus: true, className: "doorfront-text-input" }), (0, jsx_runtime_1.jsx)("input", { type: "submit" })] }));
    };
    var renderExternalScanner = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "doorfront-scan-now", children: "Scan Barcode Now" }), (0, jsx_runtime_1.jsx)("input", { autoFocus: true, className: "doorfront-scan-input", ref: scannerInputRef }, "scan")] }));
    };
    var renderNav = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "doorfront-nav", children: [entryType !== "camera" && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setEntryType("camera"); }, children: "Scan with this device's built-in camera" })), entryType !== "manual" && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setEntryType("manual"); }, children: "Manually Enter Client ID" })), entryType !== "external" && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setEntryType("external"); }, children: "Scan with external scanner" }))] }));
    };
    var renderContent = function () {
        switch (entryType) {
            case "external":
                return renderExternalScanner();
            case "manual":
                return renderManualEntry();
            case "camera":
                return renderCameraScanner();
            default:
                return (0, jsx_runtime_1.jsx)("div", { children: "Reload this page." });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("form", { onSubmit: onSubmit, className: "doorfront-scan", children: (0, jsx_runtime_1.jsx)("div", { className: "doorfront-content", children: renderContent() }) }), renderMode(), renderNav()] }));
};
exports.default = ScanBarcode;
