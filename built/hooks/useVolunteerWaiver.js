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
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var volunteerApi_1 = require("../state/apis/volunteerApi/volunteerApi");
var authApi_1 = require("../state/apis/authApi");
var Loading_1 = __importDefault(require("../components/reusable/loading/Loading"));
var useVolunteerWaiver = function (campaignId) {
    var _a = __read((0, react_1.useState)(false), 2), redirectToDocusign = _a[0], setRedirectToDocusign = _a[1];
    var volunteer = (0, react_redux_1.useSelector)(function (state) { return state.volunteer.volunteer; });
    var intervalRef = (0, react_1.useRef)();
    var _b = __read((0, volunteerApi_1.useLazyGetVolunteerQuery)(), 1), getVolunteer = _b[0];
    var user = (0, authApi_1.useGetUserQuery)().data;
    var _c = (0, authApi_1.useGetUserInfoQuery)(undefined, { pollingInterval: 60000 }), userInfo = _c.data, isFetching = _c.isFetching, isLoading = _c.isLoading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var docusignLink = (0, react_1.useRef)("");
    (0, react_1.useEffect)(function () {
        if (!isFetching) {
            if (!volunteer && !userInfo) {
                navigate("../signin/" + campaignId);
            }
            else if (volunteer && !volunteer.volunteerAgreement) {
                setRedirectToDocusign(true);
                docusignLink.current = "../../sign/CKK/" + volunteer.id;
            }
            else if (userInfo && !userInfo.volunteerAgreement) {
                setRedirectToDocusign(true);
                docusignLink.current = "../../sign/CKK/" + (user === null || user === void 0 ? void 0 : user.id);
            }
            else if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.volunteerAgreement) {
                setRedirectToDocusign(false);
            }
            else if (volunteer === null || volunteer === void 0 ? void 0 : volunteer.volunteerAgreement) {
                setRedirectToDocusign(false);
            }
        }
    }, [volunteer, navigate, isFetching, userInfo, campaignId, user]);
    (0, react_1.useEffect)(function () {
        if (redirectToDocusign && (volunteer === null || volunteer === void 0 ? void 0 : volunteer.email)) {
            intervalRef.current = setInterval(function () {
                getVolunteer(volunteer.email);
            }, 10000);
        }
        else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return function () { return clearInterval(intervalRef.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirectToDocusign]);
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (redirectToDocusign) {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "CK Volunteer Waiver" }), (0, jsx_runtime_1.jsx)("p", { children: "Before you can sign up to volunteer, you'll need to sign an agreement." }), (0, jsx_runtime_1.jsx)("p", { children: "If you just signed the agreement, please wait up to one minute for the page to update." }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return navigate(docusignLink.current); }, children: "Continue" })] }));
    }
};
exports.default = useVolunteerWaiver;
