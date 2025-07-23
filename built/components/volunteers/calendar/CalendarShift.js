"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var CalendarShift = function (_a) {
    var shift = _a.shift, job = _a.job, linkUrl = _a.linkUrl, index = _a.index, children = _a.children;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var shiftDisabled = !linkUrl;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "calendar-item calendar-color-" +
            index +
            (shiftDisabled ? " calendar-shift-disabled" : ""), onClick: function () {
            if (!shiftDisabled) {
                navigate(linkUrl);
            }
        }, children: [(0, jsx_runtime_1.jsx)("div", { className: "volunteers-calendar-size", children: job.name }), (0, jsx_runtime_1.jsxs)("div", { className: "volunteers-calendar-spots", children: [shift.slots, " Spots Left"] }), children] }, shift.id));
};
exports.default = CalendarShift;
