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
exports.renderValues = exports.sortValues = exports.sortKeys = exports.filterByDate = void 0;
exports.sumField = sumField;
exports.averageField = averageField;
var jsx_runtime_1 = require("react/jsx-runtime");
var filterByDate = function (startDate, endDate, data) {
    return data.filter(function (report) {
        var reportDate = new Date("".concat(report.month, " ").concat(report.year));
        return reportDate >= new Date(startDate) && reportDate <= new Date(endDate);
    });
};
exports.filterByDate = filterByDate;
function sumField(reportList, field) {
    return reportList.reduce(function (prev, cur) { return prev + cur[field]; }, 0);
}
var sortKeys = function (obj) {
    return Object.entries(obj)
        .sort(function (_a, _b) {
        var _c = __read(_a, 2), valueA = _c[1];
        var _d = __read(_b, 2), valueB = _d[1];
        return (valueA > valueB ? -1 : 1);
    })
        .map(function (_a) {
        var _b = __read(_a, 1), key = _b[0];
        return key;
    });
};
exports.sortKeys = sortKeys;
var sortValues = function (obj) {
    return Object.values(obj).sort(function (a, b) { return (a > b ? -1 : 1); });
};
exports.sortValues = sortValues;
var renderValues = function (obj, sorted) {
    if (sorted === void 0) { sorted = false; }
    var object = Object.keys(obj);
    if (sorted) {
        object = (0, exports.sortKeys)(obj);
    }
    return object.map(function (key) {
        return ((0, jsx_runtime_1.jsxs)("li", { children: [key, ": ", obj[key]] }, key));
    });
};
exports.renderValues = renderValues;
function averageField(reportList, field) {
    return (reportList.reduce(function (prev, cur) {
        return prev +
            (cur['performanceMeasures'][field] / 100) * cur.individuals;
    }, 0) / sumField(reportList, 'individuals'));
}
