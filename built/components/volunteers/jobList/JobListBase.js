"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var campaigns_1 = require("../../../state/apis/volunteerApi/campaigns");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var JobList_1 = __importDefault(require("./JobList"));
var JobListBase = function () {
    var campaignId = (0, react_router_dom_1.useParams)().campaignId;
    var _a = (0, campaigns_1.useGetCampaignsQuery)(), campaigns = _a.data, isLoading = _a.isLoading;
    var campaign = campaigns === null || campaigns === void 0 ? void 0 : campaigns.find(function (cam) { return cam.id === campaignId; });
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!campaign) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Could not find campaign." });
    }
    return (0, jsx_runtime_1.jsx)(JobList_1.default, { campaign: campaign });
};
exports.default = JobListBase;
