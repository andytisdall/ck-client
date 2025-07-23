"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var signApi_1 = require("../../state/apis/signApi");
var authApi_1 = require("../../state/apis/authApi");
var Status_1 = __importDefault(require("../reusable/status/Status"));
var HomeChefStatus = function () {
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var signingConfig = (0, signApi_1.useGetSigningConfigQuery)().data;
    var signLink = signingConfig && signingConfig.limitReached ? "emailAgreement" : "sign/HC";
    var foodHandler = {
        text: "Obtain a Food Handler certification and upload the certificate",
        url: "onboarding/upload-food-handler",
        completed: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.foodHandler) || false,
    };
    var volunteerAgreement = {
        text: "Sign our volunteer agreement",
        url: "onboarding/" + signLink,
        completed: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefAgreement) || false,
    };
    var homeChefQuiz = {
        text: "Watch the orientation video and take the home chef quiz",
        url: "onboarding/orientation-video",
        completed: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefQuizPassed) || false,
    };
    var tasks = [foodHandler, volunteerAgreement, homeChefQuiz];
    return ((0, jsx_runtime_1.jsx)(Status_1.default, { tasks: tasks, children: (0, jsx_runtime_1.jsx)("strong", { children: "Thank you for signing up to become a CK Home Chef! Please complete the following tasks to become an Active Home Chef." }) }));
};
exports.default = HomeChefStatus;
