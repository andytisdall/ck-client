"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var sizeMeasurements = {
    Bike: "",
    Small: "2-3 cambros",
    Medium: "4-5 cambros",
    Large: "6+ cambros",
};
var CarSizeOption = function (_a) {
    var size = _a.size, setSize = _a.setSize, selected = _a.selected;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "driver-car-size ".concat(selected ? "driver-car-size-selected" : ""), onClick: function () { return setSize(size); }, children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/drivers/vehicle-".concat(size, ".jpg"), alt: size, className: "driver-car-photo" }), (0, jsx_runtime_1.jsx)("div", { className: "driver-car-size-label", children: size }), (0, jsx_runtime_1.jsx)("i", { children: sizeMeasurements[size] })] }));
};
exports.default = CarSizeOption;
