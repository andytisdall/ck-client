"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var volunteerApi_1 = require("../../../state/apis/volunteerApi/volunteerApi");
var jobs_1 = require("../../../state/apis/volunteerApi/jobs");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var ShiftInfo_1 = __importDefault(require("../shiftInfo/ShiftInfo"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
// import config from "../driver/config";
var Confirmation = function (_a) {
    var _b;
    var hour = _a.hour, campaign = _a.campaign;
    var contactId = (0, react_router_dom_1.useParams)().contactId;
    var _c = __read((0, volunteerApi_1.useCancelVolunteerShiftMutation)(), 2), cancelShift = _c[0], cancelIsLoading = _c[1].isLoading;
    var _d = (0, jobs_1.useGetJobsQuery)({
        campaignId: campaign.id,
    }), jobs = _d.data, isLoading = _d.isLoading;
    var job = jobs === null || jobs === void 0 ? void 0 : jobs.find(function (j) { return j.id === (hour === null || hour === void 0 ? void 0 : hour.job); });
    var shift = (_b = job === null || job === void 0 ? void 0 : job.shifts) === null || _b === void 0 ? void 0 : _b.find(function (sh) { return sh.id === (hour === null || hour === void 0 ? void 0 : hour.shift); });
    // const driver = campaign?.id === config.driverCampaignId;
    var dispatch = (0, react_redux_1.useDispatch)();
    var onCancel = function () {
        if (hour) {
            cancelShift({ hoursId: hour.id, contactId: contactId })
                .unwrap()
                .then(function () {
                return dispatch((0, alertSlice_1.setAlert)("You have canceled your volunteer shift"));
            });
        }
    };
    var canceled = (hour === null || hour === void 0 ? void 0 : hour.status) === "Canceled";
    var renderMessage = function () {
        var confirmMessage = ((0, jsx_runtime_1.jsx)("p", { className: "success-text", children: "You have successfully signed up for this shift:" }));
        var cancelMessage = ((0, jsx_runtime_1.jsx)("p", { className: "cancel-text", children: "You have canceled this shift:" }));
        return canceled ? cancelMessage : confirmMessage;
    };
    var renderShiftDetails = function () {
        if (isLoading) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        if (shift && job) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signup-confirm", children: [renderMessage(), (0, jsx_runtime_1.jsx)(ShiftInfo_1.default, { job: job, shift: shift, campaign: campaign }), (0, jsx_runtime_1.jsx)("p", { children: "You have been sent an email with this information." })] }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)("div", { className: "hc-confirm-details", children: "Could not find the details of this shift." }));
        }
    };
    var renderCancelButton = function () {
        if (cancelIsLoading) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        if (!canceled) {
            return ((0, jsx_runtime_1.jsx)("button", { onClick: onCancel, className: "cancel", children: "Cancel Your Booked Volunteer Time" }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Volunteer Sign Up Confirmation" }), renderShiftDetails(), (0, jsx_runtime_1.jsxs)("div", { className: "volunteers-signup-btns", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/volunteers/signup/" + campaign.id, children: (0, jsx_runtime_1.jsx)("button", { className: "hc-confirm-button", children: "Back" }) }), hour && renderCancelButton()] })] }));
};
exports.default = Confirmation;
