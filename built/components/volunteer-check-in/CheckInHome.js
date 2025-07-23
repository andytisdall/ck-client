"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var checkInApi_1 = require("../../state/apis/volunteerApi/checkInApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var CheckInHome = function () {
    var _a = (0, checkInApi_1.useGetTodaysShiftsQuery)(), shifts = _a.data, isLoading = _a.isLoading;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    var renderKitchenShift = function () {
        if (shifts === null || shifts === void 0 ? void 0 : shifts.length) {
            return shifts.map(function (shift) {
                return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "list/".concat(shift.id), children: (0, jsx_runtime_1.jsx)("button", { children: (0, jsx_runtime_1.jsx)("h4", { children: shift.job }) }) }, shift.id));
            });
        }
        else {
            return ((0, jsx_runtime_1.jsx)("div", { className: "check-in-empty", children: (0, jsx_runtime_1.jsx)("p", { children: "No shifts today." }) }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Today's Volunteer Jobs" }), renderKitchenShift()] }));
};
exports.default = CheckInHome;
