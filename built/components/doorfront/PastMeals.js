"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var PastMeals = function (_a) {
    var meals = _a.meals;
    var mealsThisMonth = meals === null || meals === void 0 ? void 0 : meals.filter(function (meal) { return (0, date_fns_1.getMonth)(new Date(meal.date)) === (0, date_fns_1.getMonth)(new Date()); });
    var numberOfMealsThisMonth = mealsThisMonth === null || mealsThisMonth === void 0 ? void 0 : mealsThisMonth.reduce(function (prev, cur) { return prev + cur.amount; }, 0);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "doorfront-col", children: [(0, jsx_runtime_1.jsxs)("b", { children: ["Meals received this month (", numberOfMealsThisMonth, "):"] }), (0, jsx_runtime_1.jsx)("ul", { children: mealsThisMonth === null || mealsThisMonth === void 0 ? void 0 : mealsThisMonth.sort(function (a, b) { return (new Date(a.date) > new Date(b.date) ? -1 : 1); }).map(function (meal) { return ((0, jsx_runtime_1.jsx)("li", { children: "".concat((0, date_fns_1.format)(new Date(meal.date), "M/d/yy"), " - ").concat(meal.amount, " meal").concat(meal.amount === 1 ? "" : "s") }, meal.id)); }) })] }));
};
exports.default = PastMeals;
