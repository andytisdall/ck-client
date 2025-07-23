"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var reportMethods_1 = require("./reportMethods");
var Chart_1 = __importDefault(require("./Chart"));
var Households = function (_a) {
    var reports = _a.reports;
    var data = (0, react_1.useMemo)(function () {
        return {
            'Households Provided Meals': (0, reportMethods_1.sumField)(reports, 'households'),
        };
    }, [reports]);
    var renderHouseholds = function () {
        return (0, jsx_runtime_1.jsx)("ul", { children: (0, reportMethods_1.renderValues)(data) });
    };
    return (0, jsx_runtime_1.jsx)(Chart_1.default, { title: "Households", children: renderHouseholds() });
};
exports.default = Households;
