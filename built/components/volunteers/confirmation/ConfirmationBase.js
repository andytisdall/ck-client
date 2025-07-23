"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Confirmation_1 = __importDefault(require("./Confirmation"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var volunteerApi_1 = require("../../../state/apis/volunteerApi/volunteerApi");
var campaigns_1 = require("../../../state/apis/volunteerApi/campaigns");
var ConfirmationBase = function () {
    var hoursId = (0, react_router_dom_1.useParams)().hoursId;
    var _a = (0, campaigns_1.useGetCampaignsQuery)(), campaigns = _a.data, campaignsIsLoading = _a.isLoading;
    var _b = (0, volunteerApi_1.useGetHourQuery)(hoursId || ""), hour = _b.data, hourIsLoading = _b.isLoading;
    var isLoading = campaignsIsLoading || hourIsLoading;
    var campaignId = hour === null || hour === void 0 ? void 0 : hour.campaign;
    var campaign = campaignId
        ? campaigns === null || campaigns === void 0 ? void 0 : campaigns.find(function (cam) { return cam.id.startsWith(campaignId); })
        : undefined;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!campaign || !hour) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Not Found." });
    }
    return (0, jsx_runtime_1.jsx)(Confirmation_1.default, { campaign: campaign, hour: hour });
};
exports.default = ConfirmationBase;
