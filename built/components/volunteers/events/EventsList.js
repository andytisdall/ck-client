"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_tz_1 = require("date-fns-tz");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var TextButton_1 = __importDefault(require("../../reusable/TextButton"));
var campaigns_1 = require("../../../state/apis/volunteerApi/campaigns");
var EventsList = function () {
    var _a = (0, campaigns_1.useGetCampaignsQuery)(), campaigns = _a.data, isLoading = _a.isLoading;
    var eventCampaigns = campaigns === null || campaigns === void 0 ? void 0 : campaigns.filter(function (cam) { return cam.startDate; });
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (eventCampaigns === null || eventCampaigns === void 0 ? void 0 : eventCampaigns.length) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-home-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "volunteers-home-section-title", children: "Special Event Volunteer Opportunities" }), (0, jsx_runtime_1.jsx)("div", { className: "volunteers-home-section-body", children: eventCampaigns.map(function (cam) {
                        var description = "";
                        if (!cam.buttonText) {
                            var startDate = cam.startDate
                                ? (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(cam.startDate, "America/Los_Angeles"), "eeee, MMMM do")
                                : "";
                            var endDate = cam.endDate
                                ? " - " +
                                    (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(cam.endDate, "America/Los_Angeles"), "eeee, MMMM do")
                                : "";
                            description = startDate + endDate;
                        }
                        else {
                            description = cam.buttonText;
                        }
                        return ((0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: cam.name, descriptionText: description, to: "signup/".concat(cam.id) }, cam.id));
                    }) })] }));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
};
exports.default = EventsList;
