"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var date_fns_tz_1 = require("date-fns-tz");
require("./Volunteers.css");
var style_1 = require("../../utils/style");
var campaigns_1 = require("../../state/apis/volunteerApi/campaigns");
var config_1 = __importDefault(require("./config"));
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var CampaignBase = function () {
    var campaignId = (0, react_router_dom_1.useParams)().campaignId;
    var _a = (0, campaigns_1.useGetCampaignsQuery)(), campaigns = _a.data, isLoading = _a.isLoading;
    var campaign = campaigns === null || campaigns === void 0 ? void 0 : campaigns.find(function (c) {
        return c.id === campaignId || c.id.substring(0, c.id.length - 3) === campaignId;
    });
    var driver = (campaign === null || campaign === void 0 ? void 0 : campaign.id) === config_1.default.deliveryDrivers.id;
    var event = !!(campaign === null || campaign === void 0 ? void 0 : campaign.startDate);
    var renderImages = function () {
        var campaignConfig = Object.values(config_1.default).find(function (_a) {
            var id = _a.id;
            return id === campaignId;
        });
        if (campaignConfig) {
            return campaignConfig.images.map(function (img) { return ((0, jsx_runtime_1.jsx)("img", { src: "/images/volunteers/".concat(img), alt: "CK Volunteers", className: "volunteers-kitchen-signup-photo volunteers-photo-frame" }, img)); });
        }
    };
    var renderEditDriverInfoBtn = function () {
        if (driver) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "volunteers-kitchen-signup-photos", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../../driver-onboarding", children: (0, jsx_runtime_1.jsx)("button", { children: "Edit your information" }) }) }));
        }
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!campaign) {
        if (event) {
            return ((0, jsx_runtime_1.jsx)("h2", { children: "This event is no longer open to sign ups. Check the volunteers page for events in the future!" }));
        }
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "Could not find the required info. Please start over." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/volunteers", children: (0, jsx_runtime_1.jsx)("button", { children: "Volunteers Home" }) })] }));
    }
    var renderEvent = function () {
        var startDate = (campaign === null || campaign === void 0 ? void 0 : campaign.startDate)
            ? (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(campaign.startDate, "America/Los_Angeles"), "eeee, MMMM do")
            : "";
        var endDate = (campaign === null || campaign === void 0 ? void 0 : campaign.endDate)
            ? " - " +
                (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(campaign === null || campaign === void 0 ? void 0 : campaign.endDate, "America/Los_Angeles"), "eeee, MMMM do")
            : "";
        var date = startDate + endDate;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-body", children: [(0, jsx_runtime_1.jsx)("h3", { children: date }), (0, jsx_runtime_1.jsx)("p", { className: "volunteers-home-section-body", children: campaign.description }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
    };
    var renderOngoing = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "volunteers-shift-signup-links", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { className: style_1.navLink, to: "/volunteers/signup/".concat(campaignId), children: "List" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { className: style_1.navLink, to: "cal", children: "Calendar" })] }), renderEditDriverInfoBtn(), (0, jsx_runtime_1.jsx)("div", { className: "volunteers-kitchen-signup-photos", children: renderImages() }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "volunteers-main-header volunteers-kitchen-header", children: campaign.name }), event ? renderEvent() : renderOngoing()] }));
};
exports.default = CampaignBase;
