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
var PerformanceMeasuresComponent = function (_a) {
    var reports = _a.reports;
    var data = (0, react_1.useMemo)(function () {
        var performanceMeasures = reports.map(function (r) { return r.performanceMeasures; });
        return {
            'Percent without Access to Kitchen': (0, reportMethods_1.averageField)(reports, 'percentWOAccess'),
            'Meals Provided': (0, reportMethods_1.sumField)(performanceMeasures, 'mealsProvided'),
            'Unusable Meals': (0, reportMethods_1.sumField)(performanceMeasures, 'unusable'),
            'Number of Calfresh postcards given out': (0, reportMethods_1.sumField)(performanceMeasures, 'postcards'),
            'Number of Calfresh applications assisted': (0, reportMethods_1.sumField)(performanceMeasures, 'calfreshApps'),
            'Number of Calfresh applications sent to SSA': (0, reportMethods_1.sumField)(performanceMeasures, 'SSA'),
        };
    }, [reports]);
    var chartData = (0, react_1.useMemo)(function () {
        return {
            labels: (0, reportMethods_1.sortKeys)(data),
            datasets: [
                {
                    data: (0, reportMethods_1.sortValues)(data),
                    backgroundColor: 'pink',
                },
            ],
        };
    }, [data]);
    var renderChart = function () {
        return (0, jsx_runtime_1.jsx)(react_chartjs_2_1.Bar, { data: chartData, options: CBO_1.defaultOptions });
    };
    return ((0, jsx_runtime_1.jsx)(Chart_1.default, { title: "Performance Measures", children: (0, jsx_runtime_1.jsxs)("div", { className: "cbo-dataset", children: [!data ? (0, jsx_runtime_1.jsx)("p", { children: "No Data" }) : (0, jsx_runtime_1.jsx)("ul", { children: (0, reportMethods_1.renderValues)(data, true) }), renderChart()] }) }));
};
exports.default = PerformanceMeasuresComponent;
