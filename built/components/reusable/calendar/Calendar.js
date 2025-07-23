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
var date_fns_tz_1 = require("date-fns-tz");
var date_fns_1 = require("date-fns");
require("./Calendar.css");
var Calendar = function (_a) {
    var renderItems = _a.renderItems;
    var _b = __read((0, react_1.useState)(new Date()), 2), month = _b[0], setMonth = _b[1];
    var getDays = (0, react_1.useCallback)(function () {
        var days = [];
        var firstDay = (0, date_fns_1.startOfMonth)(month);
        var dayOfWeek = (0, date_fns_1.getDay)(firstDay);
        for (var i = 0; i < dayOfWeek; i++) {
            days.push(null);
        }
        var numberOfDays = (0, date_fns_1.getDaysInMonth)(month);
        for (var i = 0; i < numberOfDays; i++) {
            var date = (0, date_fns_1.addDays)(firstDay, i);
            days.push((0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(new Date(date), "America/Los_Angeles"), "yyyy-MM-dd"));
        }
        return days.map(function (d, i) {
            if (!d) {
                return (0, jsx_runtime_1.jsx)("div", {}, i);
            }
            var items = renderItems(d);
            return ((0, jsx_runtime_1.jsxs)("div", { className: "calendar-date", children: [(0, jsx_runtime_1.jsx)("div", { className: "calendar-date-number", children: (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(d, "America/Los_Angeles"), "d") }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-date-body", children: items })] }, d));
        });
    }, [month, renderItems]);
    var calendar = function () {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "calendar-days", children: [(0, jsx_runtime_1.jsx)("div", { className: "calendar-day", children: "Sun" }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-day", children: "Mon" }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-day", children: "Tue" }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-day", children: "Wed" }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-day", children: "Thu" }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-day", children: "Fri" }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-day", children: "Sat" })] }), (0, jsx_runtime_1.jsx)("div", { className: "calendar", children: getDays() })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "calendar-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "calendar-top", children: [(0, jsx_runtime_1.jsxs)("div", { className: "calendar-header", children: [(0, jsx_runtime_1.jsx)("div", { className: "calendar-header-arrow", onClick: function () {
                                    var lastMonth = (0, date_fns_1.subMonths)(month, 1);
                                    setMonth(lastMonth);
                                }, children: "\u2190" }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-header-month", children: (0, date_fns_tz_1.format)(month, "MMMM yyyy") }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-header-arrow", onClick: function () {
                                    var nextMonth = (0, date_fns_1.addMonths)(month, 1);
                                    setMonth(nextMonth);
                                }, children: "\u2192" })] }), (0, jsx_runtime_1.jsx)("div", { className: "calendar-header", children: (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setMonth(new Date()); }, className: "calendar-set-current", children: "Set to Current Month" }) })] }), (0, jsx_runtime_1.jsx)("div", { children: calendar() })] }));
};
exports.default = Calendar;
