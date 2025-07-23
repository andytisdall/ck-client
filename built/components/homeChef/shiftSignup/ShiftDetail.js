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
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var ShiftDetail = function () {
    var _a = __read((0, react_1.useState)(""), 2), mealCount = _a[0], setMealCount = _a[1];
    var _b = __read((0, react_1.useState)(false), 2), soup = _b[0], setSoup = _b[1];
    var _c = (0, homeChefApi_1.useGetShiftsQuery)(), data = _c.data, isLoading = _c.isLoading;
    var _d = __read((0, homeChefApi_1.useSignUpForHomeChefShiftMutation)(), 2), signUpForShift = _d[0], signUpForShiftResult = _d[1];
    var shifts = data === null || data === void 0 ? void 0 : data.shifts;
    var jobs = data === null || data === void 0 ? void 0 : data.jobs;
    var shiftId = (0, react_router_dom_1.useParams)().shiftId;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = function (e) {
        if (job && shift && shiftId) {
            e.preventDefault();
            signUpForShift({
                shiftId: shiftId,
                mealCount: mealCount,
                jobId: job.id,
                date: shift.startTime,
                soup: soup,
            })
                .unwrap()
                .then(function (hours) { return navigate("/home-chef/signup/confirm/" + hours.id); });
        }
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    var shift = shifts && shiftId ? shifts[shiftId] : null;
    var job = jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === (shift === null || shift === void 0 ? void 0 : shift.job); });
    if (!(shift === null || shift === void 0 ? void 0 : shift.open)) {
        return (0, jsx_runtime_1.jsx)("p", { children: "This shift is not available for signup" });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "shift-detail", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Sign up for this delivery:" }), (0, jsx_runtime_1.jsxs)("div", { className: "signup-form-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Date: " }), (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(shift.startTime, "America/Los_Angeles"), "eeee, M/d/yy")] }), (0, jsx_runtime_1.jsxs)("div", { className: "signup-form-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Fridge: " }), job === null || job === void 0 ? void 0 : job.name] }), (0, jsx_runtime_1.jsxs)("div", { className: "signup-form-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Address: " }), job === null || job === void 0 ? void 0 : job.location] }), !!(job === null || job === void 0 ? void 0 : job.locationInfo) && ((0, jsx_runtime_1.jsxs)("div", { className: "signup-form-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Location Notes: " }), job.locationInfo] })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsx)("div", { className: "signup-form-item", children: (0, jsx_runtime_1.jsxs)("div", { className: "signup-form-meal-count", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "meal-count", children: (0, jsx_runtime_1.jsx)("strong", { children: "Number of Meals:" }) }), (0, jsx_runtime_1.jsx)("div", { className: "shift-detail-meal-number-note", children: "(You can change this later)" })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", placeholder: "25", min: 1, max: 99, required: true, id: "meal-count", value: mealCount, onChange: function (e) { return setMealCount(e.target.value); }, className: "signup-form-input" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "signup-form-item", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)("strong", { children: "Type of Meal:" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "signup-form-meal-type-option", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", onChange: function () { return setSoup(false); }, name: "soup", checked: !soup }), (0, jsx_runtime_1.jsx)("label", { children: "Entree" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "signup-form-meal-type-option", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", onChange: function () { return setSoup(true); }, name: "soup" }), (0, jsx_runtime_1.jsx)("label", { children: "Soup" })] })] }), signUpForShiftResult.isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : ((0, jsx_runtime_1.jsx)("input", { type: "submit", className: "shift-detail-submit", value: "Sign Up" }))] }), !!(job === null || job === void 0 ? void 0 : job.notes) && ((0, jsx_runtime_1.jsxs)("div", { className: "signup-form-notes", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Note: " }), job.notes] }))] }));
};
exports.default = ShiftDetail;
