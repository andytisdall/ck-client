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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var chart_js_1 = require("chart.js");
var react_1 = require("react");
var cboApi_1 = require("../../state/apis/cboApi");
var Ages_1 = __importDefault(require("./Ages"));
var Race_1 = __importDefault(require("./Race"));
var PerformanceMeasures_1 = __importDefault(require("./PerformanceMeasures"));
var ZipCodes_1 = __importDefault(require("./ZipCodes"));
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var Households_1 = __importDefault(require("./Households"));
var reportMethods_1 = require("./reportMethods");
var authApi_1 = require("../../state/apis/authApi");
var DateFilter_1 = __importDefault(require("./DateFilter"));
chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.Title, chart_js_1.BarElement, chart_js_1.CategoryScale, chart_js_1.LinearScale);
exports.defaultOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};
var CBO = function () {
    var _a = __read((0, react_1.useState)(false), 2), filterOn = _a[0], setFilterOn = _a[1];
    var _b = __read((0, react_1.useState)(''), 2), startDate = _b[0], setStartDate = _b[1];
    var _c = __read((0, react_1.useState)(''), 2), endDate = _c[0], setEndDate = _c[1];
    var _d = __read((0, react_1.useState)(false), 2), oasisOnly = _d[0], setOasisOnly = _d[1];
    var _e = (0, cboApi_1.useGetCBOReportsQuery)(), reports = _e.data, reportsIsLoading = _e.isLoading;
    var _f = (0, authApi_1.useGetUserQuery)(), user = _f.data, userIsLoading = _f.isLoading;
    var _g = __read((0, cboApi_1.useEmailReportMutation)(), 1), emailReport = _g[0];
    var monthOptions = (0, react_1.useMemo)(function () {
        if (reports) {
            var months_1 = [];
            reports.forEach(function (rep) {
                var date = "".concat(rep.month, " ").concat(rep.year);
                if (!months_1.includes(date)) {
                    months_1.push(date);
                }
            });
            return months_1.sort(function (a, b) { return (new Date(a) > new Date(b) ? 1 : -1); });
        }
        return [];
    }, [reports]);
    var filteredReports = (0, react_1.useMemo)(function () {
        if (reports) {
            var tempReports = reports;
            if (filterOn) {
                tempReports = (0, reportMethods_1.filterByDate)(startDate, endDate, tempReports);
            }
            if (oasisOnly) {
                tempReports = tempReports.filter(function (rep) { return rep.cboId === '0018Z000036rH4rQAE'; });
            }
            return tempReports;
        }
    }, [reports, filterOn, startDate, endDate, oasisOnly]);
    if (reportsIsLoading || userIsLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "cbo main", children: (0, jsx_runtime_1.jsx)(Loading_1.default, {}) }));
    }
    if (!(user === null || user === void 0 ? void 0 : user.admin)) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "cbo main", children: (0, jsx_runtime_1.jsx)("h3", { children: "User is not authorized." }) }));
    }
    var renderOasisCheckbox = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { id: "oasis-only", type: "checkbox", checked: oasisOnly, onChange: function (e) {
                        if (e.target.checked) {
                            setOasisOnly(true);
                        }
                        else {
                            setOasisOnly(false);
                        }
                    } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "oasis-only", children: "Mobile Oasis Only" })] }));
    };
    if (filteredReports) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "cbo main", children: [(0, jsx_runtime_1.jsx)("h1", { children: "CBO Report Data" }), (0, jsx_runtime_1.jsx)(DateFilter_1.default, { numberOfReports: filteredReports.length, monthOptions: monthOptions, setStartDate: setStartDate, setEndDate: setEndDate, filterOn: filterOn, setFilterOn: setFilterOn, startDate: startDate, endDate: endDate }), renderOasisCheckbox(), (0, jsx_runtime_1.jsx)(Ages_1.default, { reports: filteredReports }), (0, jsx_runtime_1.jsx)(Race_1.default, { reports: filteredReports }), (0, jsx_runtime_1.jsx)(PerformanceMeasures_1.default, { reports: filteredReports }), (0, jsx_runtime_1.jsx)(ZipCodes_1.default, { reports: filteredReports }), (0, jsx_runtime_1.jsx)(Households_1.default, { reports: filteredReports }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return emailReport(); }, children: "Email Reports" })] }));
    }
    return (0, jsx_runtime_1.jsx)("div", { className: "cbo main", children: "No Data Found. Try refreshing." });
};
exports.default = CBO;
