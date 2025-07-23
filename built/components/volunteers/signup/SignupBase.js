"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var volunteerApi_1 = require("../../../state/apis/volunteerApi/volunteerApi");
var campaigns_1 = require("../../../state/apis/volunteerApi/campaigns");
var signApi_1 = require("../../../state/apis/signApi");
var authApi_1 = require("../../../state/apis/authApi");
var Signup_1 = __importDefault(require("./Signup"));
var SignupBase = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_router_dom_1.useParams)(), shiftId = _a.shiftId, campaignId = _a.campaignId;
    var volunteer = (0, react_redux_1.useSelector)(function (state) { return state.volunteer.volunteer; });
    var _b = (0, campaigns_1.useGetCampaignsQuery)(), campaigns = _b.data, isLoading = _b.isLoading;
    var campaign = campaigns === null || campaigns === void 0 ? void 0 : campaigns.find(function (cam) { return cam.id === campaignId; });
    var user = (0, authApi_1.useGetUserQuery)().data;
    var signingConfig = (0, signApi_1.useGetSigningConfigQuery)().data;
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var waiverSigned = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.volunteerAgreement) || (volunteer === null || volunteer === void 0 ? void 0 : volunteer.volunteerAgreement);
    var contactId = "";
    if (user) {
        contactId = user.salesforceId;
    }
    if (volunteer) {
        contactId = volunteer.id;
    }
    var hours = (0, volunteerApi_1.useGetHoursQuery)({
        campaignId: (campaign === null || campaign === void 0 ? void 0 : campaign.id) || "",
        contactId: contactId,
    }).data;
    var bookedJobs = (0, react_1.useMemo)(function () {
        return hours
            ? hours.filter(function (h) { return h.status === "Confirmed"; }).map(function (h) { return h.shift; })
            : [];
    }, [hours]);
    var destinationUrl = "../../../confirm/".concat(contactId, "/");
    (0, react_1.useEffect)(function () {
        if (hours && shiftId && bookedJobs.includes(shiftId)) {
            var hour = hours.find(function (h) { return h.shift === shiftId && h.status === "Confirmed"; });
            if (hour) {
                navigate(destinationUrl + hour.id);
            }
        }
    }, [bookedJobs, destinationUrl, hours, navigate, shiftId]);
    var afterSubmit = function (hoursId) {
        if ((userInfo || volunteer) &&
            signingConfig &&
            !waiverSigned &&
            !signingConfig.limitReached) {
            navigate("../../../sign/CKK/".concat(contactId, "/").concat(hoursId));
        }
        else {
            navigate(destinationUrl + hoursId);
        }
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!campaign || !shiftId) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Could not find the requested info." });
    }
    return ((0, jsx_runtime_1.jsx)(Signup_1.default, { contactId: contactId, shiftId: shiftId, campaign: campaign, afterSubmit: afterSubmit }));
};
exports.default = SignupBase;
