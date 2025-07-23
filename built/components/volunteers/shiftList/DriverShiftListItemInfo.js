"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var react_router_dom_1 = require("react-router-dom");
var formatDateTime_1 = require("../formatDateTime");
var DriverShiftListItemInfo = function (_a) {
    var shift = _a.shift, isAvailable = _a.isAvailable, linkUrl = _a.linkUrl, children = _a.children;
    var formattedStartDate = (0, formatDateTime_1.formatDate)(shift.startTime);
    var formattedStartTime = (0, formatDateTime_1.formatTime)(shift.startTime);
    var endTime = (0, date_fns_1.formatISO)((0, date_fns_1.addHours)(new Date(shift.startTime), shift.duration));
    var formattedEndTime = (0, formatDateTime_1.formatTime)(endTime);
    var disabledStyle = isAvailable ? "" : "volunteers-unavailable";
    var renderContent = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift ".concat(disabledStyle), children: [(0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-date", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u2022 " }), (0, jsx_runtime_1.jsxs)("div", { children: [formattedStartDate, (0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-date-time ".concat(disabledStyle), children: ["Pickup window: ", formattedStartTime, " - ", formattedEndTime] })] })] }), shift.slots !== null && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "volunteers-shift-space" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { children: ["Minimum vehicle size required: ", shift.carSizeRequired] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Distance: ", shift.distance] })] })] })), children] }));
    };
    if (!isAvailable) {
        return (0, jsx_runtime_1.jsx)("div", { children: renderContent() });
    }
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: linkUrl, children: renderContent() });
};
exports.default = DriverShiftListItemInfo;
