"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var checkInApi_1 = require("../../state/apis/volunteerApi/checkInApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var signApi_1 = require("../../state/apis/signApi");
var CheckInVolunteers = function () {
    var shiftId = (0, react_router_dom_1.useParams)().shiftId;
    var shifts = (0, checkInApi_1.useGetTodaysShiftsQuery)().data;
    var shift = shifts === null || shifts === void 0 ? void 0 : shifts.find(function (sh) { return sh.id === shiftId; });
    var navigate = (0, react_router_dom_1.useNavigate)();
    // get api sign limit info and don't refer to sign if it's at 40
    var signApiConfig = (0, signApi_1.useGetSigningConfigQuery)(undefined, {
        pollingInterval: 60000,
    }).data;
    var _a = (0, checkInApi_1.useGetVolunteersForCheckInQuery)(shiftId || ""), volunteers = _a.data, isLoading = _a.isLoading;
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    var renderConfirmedVolunteers = function () {
        if (!(volunteers === null || volunteers === void 0 ? void 0 : volunteers.length)) {
            return (0, jsx_runtime_1.jsx)("h4", { children: "No volunteers are scheduled for today" });
        }
        if (!signApiConfig) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        var confirmedVols = volunteers === null || volunteers === void 0 ? void 0 : volunteers.filter(function (_a) {
            var status = _a.status;
            return status === "Confirmed";
        });
        if ((confirmedVols === null || confirmedVols === void 0 ? void 0 : confirmedVols.length) === 0) {
            return (0, jsx_runtime_1.jsx)("h4", { children: "All scheduled volunteers are checked in" });
        }
        if (confirmedVols === null || confirmedVols === void 0 ? void 0 : confirmedVols.length) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Not Checked In" }), (0, jsx_runtime_1.jsx)("div", { className: "check-in-volunteer-list", children: confirmedVols.map(function (vol) {
                            var url = vol.volunteerAgreement || signApiConfig.limitReached
                                ? "../confirm/".concat(vol.contactId, "/").concat(shiftId)
                                : "../sign/pre/".concat(vol.contactId, "/").concat(shiftId);
                            return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: url, className: "check-in-volunteer-item", children: (0, jsx_runtime_1.jsxs)("p", { children: [vol.firstName, " ", vol.lastName] }) }, vol.hoursId));
                        }) })] }));
        }
    };
    var renderCheckedInVolunteers = function () {
        var checkedInVols = volunteers === null || volunteers === void 0 ? void 0 : volunteers.filter(function (_a) {
            var status = _a.status;
            return status === "Completed";
        });
        if (checkedInVols === null || checkedInVols === void 0 ? void 0 : checkedInVols.length) {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Checked In" }), checkedInVols.map(function (vol) {
                        return ((0, jsx_runtime_1.jsx)("ul", { children: (0, jsx_runtime_1.jsxs)("li", { children: [vol.firstName, " ", vol.lastName] }) }, vol.hoursId));
                    })] }));
        }
    };
    var renderNewVolunteerBtn = function () {
        return ((0, jsx_runtime_1.jsx)("div", { className: "check-in-volunteer-list", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../create/" + shiftId, children: (0, jsx_runtime_1.jsx)("div", { className: "check-in-volunteer-item check-in-new-volunteer-btn", children: (0, jsx_runtime_1.jsx)("p", { children: "New Volunteer" }) }) }) }));
    };
    var renderVolunteers = function () {
        if (!volunteers) {
            return (0, jsx_runtime_1.jsx)("p", { children: "Error getting volunteer info." });
        }
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderConfirmedVolunteers(), renderNewVolunteerBtn(), renderCheckedInVolunteers()] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "check-in-list", children: [(0, jsx_runtime_1.jsxs)("div", { className: "check-in-list-header", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate(".."); }, children: "Back to Jobs" }), (0, jsx_runtime_1.jsx)("h2", { children: shift === null || shift === void 0 ? void 0 : shift.job })] }), (0, jsx_runtime_1.jsx)("div", { className: "check-in-list-detail", children: renderVolunteers() })] }));
};
exports.default = CheckInVolunteers;
