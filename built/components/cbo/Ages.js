"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var CBO_1 = require("./CBO");
var reportMethods_1 = require("./reportMethods");
var Chart_1 = __importDefault(require("./Chart"));
var Ages = function (_a) {
    var reports = _a.reports;
    var data = (0, react_1.useMemo)(function () {
        var ages = reports.map(function (r) { return r.age; });
        return {
            '0 - 17': (0, reportMethods_1.sumField)(ages, 'age17'),
            '18 - 26': (0, reportMethods_1.sumField)(ages, 'age26'),
            '27 - 49': (0, reportMethods_1.sumField)(ages, 'age26'),
            '50 - 60': (0, reportMethods_1.sumField)(ages, 'age60'),
            'Over 60': (0, reportMethods_1.sumField)(ages, 'ageOver60'),
            Unknown: (0, reportMethods_1.sumField)(ages, 'ageUnknown'),
        };
    }, [reports]);
    var chartData = (0, react_1.useMemo)(function () {
        return {
            labels: Object.keys(data),
            datasets: [{ data: Object.values(data), backgroundColor: 'green' }],
        };
    }, [data]);
    var renderChart = function () {
        return (0, jsx_runtime_1.jsx)(react_chartjs_2_1.Bar, { data: chartData, options: CBO_1.defaultOptions });
    };
    var renderAges = function () {
        return (0, jsx_runtime_1.jsx)("ul", { children: (0, reportMethods_1.renderValues)(data) });
    };
    return ((0, jsx_runtime_1.jsxs)(Chart_1.default, { title: "Ages", children: [renderAges(), renderChart()] }));
};
exports.default = Ages;
