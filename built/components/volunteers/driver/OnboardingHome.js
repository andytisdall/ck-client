"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var DriverSettings_1 = __importDefault(require("./DriverSettings"));
var driver_1 = require("../../../state/apis/volunteerApi/driver");
var Status_1 = __importDefault(require("../../reusable/status/Status"));
var Onboarding = function () {
    var driver = (0, driver_1.useGetDriverQuery)().data;
    var driversLicense = {
        text: "Upload driver's license",
        completed: !!(driver === null || driver === void 0 ? void 0 : driver.licenseExpiration),
        url: "license",
    };
    var insurance = {
        text: "Upload proof of insurance",
        completed: !!(driver === null || driver === void 0 ? void 0 : driver.insuranceExpiration),
        url: "insurance",
    };
    var car = {
        text: "Enter info about your vehicle",
        completed: !!(driver === null || driver === void 0 ? void 0 : driver.car.size),
        url: "car",
    };
    var volunteerAgreement = {
        text: "Sign the volunteer agreement",
        completed: !!(driver === null || driver === void 0 ? void 0 : driver.volunteerAgreement),
        url: "sign/DRV",
    };
    var tasks = [driversLicense, insurance, car, volunteerAgreement];
    if ((driver === null || driver === void 0 ? void 0 : driver.insuranceExpiration) &&
        driver.licenseExpiration &&
        driver.car.size &&
        driver.volunteerAgreement) {
        return (0, jsx_runtime_1.jsx)(DriverSettings_1.default, {});
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/driver-onboarding.jpg", alt: "CK Driver Volunteers" }), (0, jsx_runtime_1.jsxs)("div", { className: "driver-onboarding-text", children: [(0, jsx_runtime_1.jsx)("p", { children: "Thank you for volunteering to support pickups and deliveries with Community Kitchens! It takes many hands to get nutritious food out to our community, and we truly appreciate you being part of the effort. Here are a few examples of delivery volunteer roles:" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: "Picking up donated food and bringing it to the CK Kitchen (2270 Telegraph Ave, Oakland)" }), (0, jsx_runtime_1.jsx)("li", { children: "Delivering meals from the CK Kitchen to Town Fridges" }), (0, jsx_runtime_1.jsx)("li", { children: "Distributing meals by bike to our unhoused neighbors" })] }), (0, jsx_runtime_1.jsxs)("p", { children: ["If you have any questions about the delivery program, please reach out to Kenai at", " ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:kenai@ckoakland.org", className: "retro-link", children: "kenai@ckoakland.org" }), ". For technical support, contact Andy at", " ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:andy@ckoakland.org", className: "retro-link", children: "andy@ckoakland.org" }), ". Thanks again for being part of the team!"] }), (0, jsx_runtime_1.jsx)("p", { children: "\u2014 Community Kitchens" })] }), (0, jsx_runtime_1.jsx)(Status_1.default, { tasks: tasks, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("strong", { children: "You must complete onboarding to sign up for driver volunteer shifts. Click on a task to start." }) }) })] }));
};
exports.default = Onboarding;
