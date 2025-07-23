"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var campaigns_1 = require("../../state/apis/volunteerApi/campaigns");
var TextButton_1 = __importDefault(require("../reusable/TextButton"));
var EventsList_1 = __importDefault(require("./events/EventsList"));
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var homeChefDescription = "A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.";
var VolunteersHome = function () {
    var _a = (0, campaigns_1.useGetCampaignsQuery)(), campaigns = _a.data, isLoading = _a.isLoading;
    var renderOngoingCampaign = function (cam) {
        var link = "signup/".concat(cam.id);
        return ((0, jsx_runtime_1.jsx)(TextButton_1.default, { to: link, descriptionText: cam.description, buttonText: cam.name }, cam.id));
    };
    var renderOngoing = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-home-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "volunteers-home-section-title", children: "Ongoing Volunteer Programs" }), (0, jsx_runtime_1.jsxs)("div", { className: "volunteers-home-section-body", children: [(0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "../home-chef", descriptionText: homeChefDescription, buttonText: "Home Chef Volunteers" }), isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : (campaigns === null || campaigns === void 0 ? void 0 : campaigns.filter(function (cam) { return !cam.startDate; }).sort(function (a, b) { return (a.name > b.name ? 1 : -1); }).map(function (cam) { return renderOngoingCampaign(cam); }))] })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-home", children: [renderOngoing(), !isLoading && (0, jsx_runtime_1.jsx)(EventsList_1.default, {}), (0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/volunteer-group.jpg", alt: "A group of CK Kitchen volunteers", className: "volunteers-home-img volunteers-photo-frame" })] }));
};
exports.default = VolunteersHome;
