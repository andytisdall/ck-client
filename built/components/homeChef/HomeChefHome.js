"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var homeChefApi_1 = require("../../state/apis/volunteerApi/homeChefApi");
var authApi_1 = require("../../state/apis/authApi");
var TextButton_1 = __importDefault(require("../reusable/TextButton"));
var renderWithFallback_1 = __importDefault(require("../reusable/loading/renderWithFallback"));
var FridgeMap = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require("./fridgeMap/FridgeMap")); }); });
var shiftSignupDescription = "See availability for town fridges and sign up to make a delivery";
var chefDescription = "See upcoming deliveries you've signed up for, and past deliveries you've made";
var resourcesDescription = "Get access to the CK recipe library and connect with other Home Chefs on slack";
var onboardingDescription = "Complete the tasks necessary to start making deliveries";
var emailDescription = "Let your friends know about CK Home Chef and invite them to cook for town fridges";
var appDescription = "Download and install the Home Chef App, where you can sign up for shifts and send alerts about your Town Fridge deliveries";
var orientationDescription = "Watch the Home Chef orientation video";
var HomeChefHome = function () {
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var campaign = (0, homeChefApi_1.useGetCampaignQuery)().data;
    var renderStatus = function () {
        if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) === "Active") {
            return ((0, jsx_runtime_1.jsxs)("p", { className: "hc-home-active-status", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Your Status:" }), " You are done with the onboarding process and may sign up for Town Fridge deliveries"] }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "onboarding", buttonText: "Onboarding", descriptionText: onboardingDescription }));
        }
    };
    var renderMealsDonated = function () {
        if (campaign === null || campaign === void 0 ? void 0 : campaign.mealsDonated) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "home-chef-total-meals", children: ["To date, CK Home Chefs have delivered ", campaign.mealsDonated, " meals to Oakland Town Fridges!"] }));
        }
    };
    var renderAnnouncement = function () {
        var ANNOUNCEMENT_DATE = new Date("2024/05/08");
        if (new Date() <= ANNOUNCEMENT_DATE) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "home-chef-announcement", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Upcoming Home Chef Supply Pick Up" }), (0, jsx_runtime_1.jsx)("h4", { children: (0, date_fns_1.format)(ANNOUNCEMENT_DATE, "eeee, M/d") }), (0, jsx_runtime_1.jsx)("h4", { children: "4-6pm at the CK Kitchen, 2270 Telegraph Ave" }), (0, jsx_runtime_1.jsx)("p", { children: "* pick up containers, labels and local produce sourced from Mandela Partners." })] }));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "hc-home", children: [(0, jsx_runtime_1.jsxs)("div", { children: [renderAnnouncement(), renderStatus(), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "signup/list", buttonText: "Sign Up to Stock a Town Fridge", descriptionText: shiftSignupDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "chef", buttonText: "Your Account", descriptionText: chefDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "resources", buttonText: "Home Chef Resources", descriptionText: resourcesDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "invite", buttonText: "Invite your friends to join CK Home Chef", descriptionText: emailDescription }), (userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) === "Active" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "../home-chef-app", buttonText: "CK Home Chef App", descriptionText: appDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "onboarding/orientation-video", buttonText: "Orientation Video", descriptionText: orientationDescription })] })), (0, renderWithFallback_1.default)((0, jsx_runtime_1.jsx)(FridgeMap, {}))] }), (0, jsx_runtime_1.jsxs)("div", { className: "home-chef-home-right-col", children: [(0, jsx_runtime_1.jsx)("img", { className: "hc-home-photo", src: "/images/home-chef/town-fridge.jpg", alt: "home chef header" }), renderMealsDonated()] })] }));
};
exports.default = HomeChefHome;
