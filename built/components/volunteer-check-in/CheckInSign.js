"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var checkInApi_1 = require("../../state/apis/volunteerApi/checkInApi");
var Loading_1 = __importDefault(require("../reusable/loading/Loading"));
var CheckInSign = function () {
    var _a = (0, react_router_dom_1.useParams)(), contactId = _a.contactId, shiftId = _a.shiftId;
    var _b = (0, checkInApi_1.useGetVolunteersForCheckInQuery)(shiftId || ""), volunteers = _b.data, isLoading = _b.isLoading;
    var volunteer = volunteers === null || volunteers === void 0 ? void 0 : volunteers.find(function (vol) { return vol.contactId === contactId; });
    var navigate = (0, react_router_dom_1.useNavigate)();
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!volunteer || !shiftId) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "check-in-volunteer", children: [(0, jsx_runtime_1.jsx)("p", { children: "There's been an error. Please start over." }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("../../list/" + shiftId); }, className: "cancel", children: "Start Over" })] }));
    }
    if (!volunteer.email) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "check-in-volunteer", children: [(0, jsx_runtime_1.jsx)("p", { children: "You must sign a paper copy of the CK Volunteer Agreement. Please ask your volunteer manager for a copy of the agreement to sign." }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("../../list/" + shiftId); }, className: "cancel", children: "Start Over" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "check-in-volunteer", children: [(0, jsx_runtime_1.jsx)("p", { children: "Before you start, you'll need to sign the CK Kitchen Volunteer Agreement." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../CI/".concat(contactId, "/").concat(shiftId), children: (0, jsx_runtime_1.jsx)("button", { children: "Sign the Agreement" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate("../../list/" + shiftId); }, className: "cancel", children: "Start Over" })] }));
};
exports.default = CheckInSign;
