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
var date_fns_1 = require("date-fns");
var date_fns_tz_1 = require("date-fns-tz");
var react_1 = require("react");
var DateFilter = function (_a) {
    var filterOn = _a.filterOn, startDate = _a.startDate, setStartDate = _a.setStartDate, endDate = _a.endDate, setEndDate = _a.setEndDate, numberOfReports = _a.numberOfReports, setFilterOn = _a.setFilterOn, monthOptions = _a.monthOptions;
    var _b = __read((0, react_1.useState)(false), 2), monthPickerActive = _b[0], setMonthPickerActive = _b[1];
    var renderDateInfo = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "cbo-date-range-display", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Date Range:", ' ', (0, jsx_runtime_1.jsx)("span", { className: "cbo-date-bold", children: !filterOn
                                ? 'All Time'
                                : startDate && endDate
                                    ? "".concat((0, date_fns_1.format)((0, date_fns_tz_1.utcToZonedTime)(startDate, 'America/Los_Angeles'), 'M/d/yy'), " - ").concat((0, date_fns_1.format)((0, date_fns_tz_1.utcToZonedTime)(endDate, 'America/Los_Angeles'), 'M/d/yy'))
                                    : '-' })] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Number of reports being used:", ' ', (0, jsx_runtime_1.jsx)("span", { className: "cbo-date-bold", children: numberOfReports })] })] }));
    };
    var renderDateSelect = function () {
        if (filterOn) {
            var datePickerStyle = monthPickerActive ? '' : 'cbo-input-selected';
            var monthPickerStyle = monthPickerActive ? 'cbo-input-selected' : '';
            return ((0, jsx_runtime_1.jsxs)("div", { className: "cbo-date-input-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cbo-date-input-section ".concat(datePickerStyle), children: [(0, jsx_runtime_1.jsx)("input", { value: startDate, onChange: function (e) {
                                    setStartDate(e.target.value);
                                    setMonthPickerActive(false);
                                }, type: "date", className: "cbo-date-input" }), (0, jsx_runtime_1.jsx)("p", { children: "to" }), (0, jsx_runtime_1.jsx)("input", { type: "date", value: endDate, onChange: function (e) {
                                    setEndDate(e.target.value);
                                    setMonthPickerActive(false);
                                }, className: "cbo-date-input" })] }), (0, jsx_runtime_1.jsx)("p", { children: "Or" }), (0, jsx_runtime_1.jsx)("div", { className: "cbo-date-input-section ".concat(monthPickerStyle), children: (0, jsx_runtime_1.jsxs)("select", { className: "cbo-month-select", onChange: function (e) {
                                var monthYear = e.target.value;
                                if (monthYear) {
                                    var monthStartDate = (0, date_fns_1.format)(new Date(monthYear), 'yyyy-MM-dd');
                                    var monthEndDate = (0, date_fns_1.format)((0, date_fns_1.lastDayOfMonth)(new Date(monthYear)), 'yyyy-MM-dd');
                                    setStartDate(monthStartDate);
                                    setEndDate(monthEndDate);
                                    setMonthPickerActive(true);
                                }
                            }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "select month" }), monthOptions === null || monthOptions === void 0 ? void 0 : monthOptions.map(function (month) { return ((0, jsx_runtime_1.jsx)("option", { value: month, children: month }, month)); })] }) })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "cbo-date-filter", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cbo-date-filter-item", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "date", onChange: function (e) {
                            if (e.target.checked) {
                                setFilterOn(false);
                            }
                        }, checked: !filterOn, id: "all-time" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "all-time", children: "All Time" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "cbo-date-filter-item", children: [(0, jsx_runtime_1.jsx)("input", { id: "date", type: "radio", name: "date", onChange: function (e) {
                            if (e.target.checked) {
                                setFilterOn(true);
                            }
                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "date", children: "Filter by Date" })] }), renderDateSelect(), renderDateInfo()] }));
};
exports.default = DateFilter;
