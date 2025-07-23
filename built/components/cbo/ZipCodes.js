"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var randomcolor_1 = __importDefault(require("randomcolor"));
var reportMethods_1 = require("./reportMethods");
var Chart_1 = __importDefault(require("./Chart"));
var ZipCodes = function (_a) {
    var reports = _a.reports;
    var data = (0, react_1.useMemo)(function () {
        var zips = reports.map(function (r) { return r.zips; });
        var obj = {};
        if (zips[0]) {
            Object.keys(zips[0]).forEach(function (key) {
                var sum = (0, reportMethods_1.sumField)(zips, key);
                obj[key] = sum;
            });
        }
        return obj;
    }, [reports]);
    var createColors = (0, react_1.useMemo)(function () {
        return Object.keys(data).map(function () { return (0, randomcolor_1.default)(); });
    }, [data]);
    var chartData = (0, react_1.useMemo)(function () {
        return {
            labels: (0, reportMethods_1.sortKeys)(data),
            datasets: [
                {
                    data: (0, reportMethods_1.sortValues)(data),
                    backgroundColor: createColors,
                },
            ],
        };
    }, [data, createColors]);
    var renderChart = function () {
        return (0, jsx_runtime_1.jsx)(react_chartjs_2_1.Pie, { data: chartData });
    };
    return ((0, jsx_runtime_1.jsx)(Chart_1.default, { title: "Zip Codes", children: (0, jsx_runtime_1.jsxs)("div", { className: "cbo-dataset", children: [(0, jsx_runtime_1.jsx)("ul", { children: (0, reportMethods_1.renderValues)(data, true) }), renderChart()] }) }));
};
exports.default = ZipCodes;
