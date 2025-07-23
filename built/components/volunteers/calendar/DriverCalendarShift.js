"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var formatDateTime_1 = require("../formatDateTime");
var driver_1 = require("../../../state/apis/volunteerApi/driver");
require("./DriverCalendar.css");
var DriverCalendarShift = function (_a) {
    var shift = _a.shift, linkUrl = _a.linkUrl, children = _a.children, index = _a.index;
    var driver = (0, driver_1.useGetDriverQuery)().data;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var carIsBigEnough = driver &&
        (0, formatDateTime_1.isCarBigEnough)({
            requirement: shift.carSizeRequired,
            userCar: driver === null || driver === void 0 ? void 0 : driver.car.size,
        });
    var shiftDisabled = !linkUrl || !carIsBigEnough;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "calendar-item calendar-color-" +
            index +
            (shiftDisabled ? " calendar-shift-disabled" : ""), onClick: function () {
            if (!shiftDisabled) {
                navigate(linkUrl);
            }
        }, children: [(0, jsx_runtime_1.jsx)("div", { children: shift.carSizeRequired }), (0, jsx_runtime_1.jsx)("div", { className: "volunteers-calendar-spots", children: shift.distance }), children] }, shift.id));
};
exports.default = DriverCalendarShift;
