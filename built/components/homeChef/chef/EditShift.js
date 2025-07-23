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
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var date_fns_tz_1 = require("date-fns-tz");
var react_redux_1 = require("react-redux");
require("./ChefShifts.css");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var EditShift = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var _a = (0, homeChefApi_1.useGetHomeChefHoursQuery)(), hours = _a.data, hoursLoading = _a.isLoading;
    var hour = hours && id ? hours[id] : undefined;
    var _b = __read((0, react_1.useState)((hour === null || hour === void 0 ? void 0 : hour.mealCount) || ""), 2), mealCount = _b[0], setMealCount = _b[1];
    var _c = __read((0, react_1.useState)(hour === null || hour === void 0 ? void 0 : hour.mealType), 2), mealType = _c[0], setMealType = _c[1];
    var _d = __read((0, react_1.useState)(false), 2), cancel = _d[0], setCancel = _d[1];
    var data = (0, homeChefApi_1.useGetShiftsQuery)().data;
    var jobs = data === null || data === void 0 ? void 0 : data.jobs;
    var dispatch = (0, react_redux_1.useDispatch)();
    var _e = __read((0, homeChefApi_1.useEditHoursMutation)(), 2), editHours = _e[0], isLoading = _e[1].isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = function (e) {
        var _a;
        e.preventDefault();
        if ((!mealCount || parseInt(mealCount, 10) < 1) && !cancel) {
            throw Error("Invalid number of meals");
        }
        if (jobs) {
            var fridge = (_a = jobs.find(function (j) { return j.id === (hour === null || hour === void 0 ? void 0 : hour.job); })) === null || _a === void 0 ? void 0 : _a.name;
            if (id && fridge && hour && mealType)
                editHours({ id: id, mealCount: mealCount, cancel: cancel, fridge: fridge, date: hour.time, mealType: mealType })
                    .unwrap()
                    .then(function () {
                    var action = cancel ? "Canceled" : "Edited";
                    dispatch((0, alertSlice_1.setAlert)("Delivery " + action));
                    navigate("..");
                });
        }
    };
    if (hoursLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    var renderCancel = function () {
        var text;
        if ((hour === null || hour === void 0 ? void 0 : hour.status) === "Confirmed") {
            text = "Check here to cancel this delivery";
        }
        if ((hour === null || hour === void 0 ? void 0 : hour.status) === "Completed") {
            text = "Check here if you did not make this delivery";
        }
        return ((0, jsx_runtime_1.jsxs)("div", { className: "chef-cancel", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "cancel", checked: cancel, onChange: function (e) { return setCancel(e.target.checked); } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "cancel", children: text })] }));
    };
    var meals = cancel ? 0 : mealCount;
    if (!hour) {
        return (0, jsx_runtime_1.jsx)("div", { children: "This shift cannot be edited." });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Edit Home Chef Delivery Details" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, className: "volunteer-edit", children: [(0, jsx_runtime_1.jsxs)("h3", { children: ["Date:", " ", (0, jsx_runtime_1.jsx)("span", { className: "edit-shift-date", children: (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(hour.time, "America/Los_Angeles"), "eee, M/d/yy") })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Number of Meals:" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: meals, onChange: function (e) { return setMealCount(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "edit-chef-type", children: ["Type of Meal:", (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "meal-type", id: "entree", onChange: function (e) {
                                            if (e.target.checked) {
                                                setMealType("Entree");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "entree", children: "Entree" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "meal-type", id: "soup", onChange: function (e) {
                                            if (e.target.checked) {
                                                setMealType("Soup");
                                            }
                                        } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "soup", children: "Soup" })] })] }), renderCancel(), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "Submit" })] })] }));
};
exports.default = EditShift;
