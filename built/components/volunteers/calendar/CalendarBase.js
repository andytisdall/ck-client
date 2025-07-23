"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var campaigns_1 = require("../../../state/apis/volunteerApi/campaigns");
var authApi_1 = require("../../../state/apis/authApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var VolunteerCalendar_1 = __importDefault(require("./VolunteerCalendar"));
var KitchenCalBase = function () {
    var campaignId = (0, react_router_dom_1.useParams)().campaignId;
    var _a = (0, campaigns_1.useGetCampaignsQuery)(), campaigns = _a.data, isLoading = _a.isLoading;
    var campaign = campaigns === null || campaigns === void 0 ? void 0 : campaigns.find(function (cam) { return cam.id === campaignId; });
    var volunteer = (0, react_redux_1.useSelector)(function (state) { return state.volunteer.volunteer; });
    var _b = (0, authApi_1.useGetUserQuery)(), user = _b.data, userIsLoading = _b.isLoading;
    var contactId = (volunteer === null || volunteer === void 0 ? void 0 : volunteer.id) || (user === null || user === void 0 ? void 0 : user.salesforceId);
    if (isLoading || userIsLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!(contactId && campaign)) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Volunteer campaign data not found" });
    }
    return (0, jsx_runtime_1.jsx)(VolunteerCalendar_1.default, { contactId: contactId, campaign: campaign });
};
exports.default = KitchenCalBase;
