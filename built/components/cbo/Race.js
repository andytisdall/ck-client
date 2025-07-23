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
var Races = function (_a) {
    var reports = _a.reports;
    var data = (0, react_1.useMemo)(function () {
        var races = reports.map(function (r) { return r.race; });
        return {
            Black: (0, reportMethods_1.sumField)(races, 'raceAfrican'),
            White: (0, reportMethods_1.sumField)(races, 'raceWhite'),
            Asian: (0, reportMethods_1.sumField)(races, 'raceAsian'),
            Latin: (0, reportMethods_1.sumField)(races, 'raceLatin'),
            Other: (0, reportMethods_1.sumField)(races, 'raceOther'),
            Unknown: (0, reportMethods_1.sumField)(races, 'raceUnknown'),
        };
    }, [reports]);
    var chartData = (0, react_1.useMemo)(function () {
        return {
            labels: (0, reportMethods_1.sortKeys)(data),
            datasets: [
                {
                    data: (0, reportMethods_1.sortValues)(data),
                    backgroundColor: 'blue',
                },
            ],
        };
    }, [data]);
    var renderChart = function () {
        return (0, jsx_runtime_1.jsx)(react_chartjs_2_1.Bar, { data: chartData, options: CBO_1.defaultOptions });
    };
    var renderAges = function () {
        return (0, jsx_runtime_1.jsx)("ul", { children: (0, reportMethods_1.renderValues)(data, true) });
    };
    return ((0, jsx_runtime_1.jsx)(Chart_1.default, { title: "Race", children: (0, jsx_runtime_1.jsxs)("div", { className: "cbo-dataset", children: [renderAges(), renderChart()] }) }));
};
exports.default = Races;
