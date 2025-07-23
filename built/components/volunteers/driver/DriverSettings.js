"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var date_fns_1 = require("date-fns");
var config_1 = __importDefault(require("../config"));
var driver_1 = require("../../../state/apis/volunteerApi/driver");
var DriverSettings = function () {
    var driver = (0, driver_1.useGetDriverQuery)().data;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var renderCar = function () {
        return ((0, jsx_runtime_1.jsxs)("li", { className: "driver-settings", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Your Vehicle:" }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-settings-update", children: [(0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Size:" }), " ", driver === null || driver === void 0 ? void 0 : driver.car.size] }), (driver === null || driver === void 0 ? void 0 : driver.car.size) !== "Bike" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Color:" }), " ", driver === null || driver === void 0 ? void 0 : driver.car.color] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Make:" }), " ", driver === null || driver === void 0 ? void 0 : driver.car.make] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Model:" }), " ", driver === null || driver === void 0 ? void 0 : driver.car.model] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Year:" }), " ", driver === null || driver === void 0 ? void 0 : driver.car.year] })] }))] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("car"); }, children: "Edit Vehicle Info" })] })] }));
    };
    var renderInsurance = function () {
        if (driver === null || driver === void 0 ? void 0 : driver.insuranceExpiration) {
            var expired = new Date(driver.insuranceExpiration) < new Date();
            return ((0, jsx_runtime_1.jsxs)("li", { className: "driver-settings", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Insurance Expiration Date: " }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-settings-update", children: [(0, jsx_runtime_1.jsx)("div", { className: "driver-settings-date ".concat(expired ? "driver-settings-expired" : ""), children: (0, date_fns_1.format)(new Date(driver.insuranceExpiration), "M/d/yy") }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("insurance"); }, children: "Update Insurance" })] })] }));
        }
    };
    var renderDriversLicense = function () {
        if (driver === null || driver === void 0 ? void 0 : driver.licenseExpiration) {
            var expired = new Date(driver.licenseExpiration) < new Date();
            return ((0, jsx_runtime_1.jsxs)("li", { className: "driver-settings", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Driver's License Expiration Date: " }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-settings-update", children: [(0, jsx_runtime_1.jsx)("div", { className: "driver-settings-date ".concat(expired ? "driver-settings-expired" : ""), children: (0, date_fns_1.format)(new Date(driver.licenseExpiration), "M/d/yy") }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("license"); }, children: "Update Driver's License" })] })] }));
        }
    };
    var renderOnboarding = function () {
        return ((0, jsx_runtime_1.jsxs)("ul", { children: [renderInsurance(), renderDriversLicense(), renderCar()] }));
    };
    var renderStatus = function () {
        if ((driver === null || driver === void 0 ? void 0 : driver.licenseExpiration) && driver.insuranceExpiration) {
            var expired = new Date(driver.licenseExpiration) < new Date() ||
                new Date(driver.insuranceExpiration) < new Date();
            if (expired) {
                return ((0, jsx_runtime_1.jsxs)("div", { className: "driver-settings-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "You must update your information" }), (0, jsx_runtime_1.jsx)("p", { children: "Some of your documents are out of date. Please update your info below." })] }));
            }
            return ((0, jsx_runtime_1.jsxs)("div", { className: "driver-settings-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "You are ready to transport meals!" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("../signup/".concat(config_1.default.deliveryDrivers.id)); }, children: "Continue to Sign Up" })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding", children: [renderStatus(), renderOnboarding()] }));
};
exports.default = DriverSettings;
