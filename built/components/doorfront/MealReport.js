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
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var doorfrontApi_1 = require("../../state/apis/mealProgramApi/doorfrontApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var react_1 = require("react");
var today = (0, date_fns_1.format)(new Date(), "yyyy-MM-dd");
var MealReport = function () {
    var _a = __read((0, doorfrontApi_1.useLazyGetMealsQuery)(), 2), getMeals = _a[0], _b = _a[1], meals = _b.data, isLoading = _b.isLoading;
    (0, react_1.useEffect)(function () {
        getMeals(today);
    }, [getMeals]);
    var renderMeals = function () {
        if (isLoading) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        if (!(meals === null || meals === void 0 ? void 0 : meals.length)) {
            return (0, jsx_runtime_1.jsx)("div", { children: "No meals found for this date." });
        }
        return meals.map(function (meal) { return (0, jsx_runtime_1.jsx)("div", { children: meal.amount }, meal.id); });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "date", defaultValue: today, onChange: function (e) { return getMeals(e.target.value); } }), renderMeals()] }));
};
exports.default = MealReport;
