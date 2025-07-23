"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOOD_HANDLER_URL = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var signApi_1 = require("../../../state/apis/signApi");
var authApi_1 = require("../../../state/apis/authApi");
var TextButton_1 = __importDefault(require("../../reusable/TextButton"));
var videoDescription = 'Watch the orientation video for new Home Chefs.';
var agreementDescription = 'Read and e-sign our volunteer agreement through Docusign.';
var uploadDescription = 'Once you have received your food handler certification, upload the document here.';
var applyDescription = 'Follow this link to start the process of receiving your food handler certification.';
exports.FOOD_HANDLER_URL = 'https://premierfoodsafety.com/food-handlers-card/california';
var HomeChefOnboarding = function () {
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var signingConfig = (0, signApi_1.useGetSigningConfigQuery)().data;
    var signLink = signingConfig && signingConfig.limitReached ? 'emailAgreement' : 'sign/HC';
    var renderActive = function () {
        if ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) === 'Active') {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "home-chef-status", children: [(0, jsx_runtime_1.jsx)("p", { children: "You are done with the onboarding process and may sign up for Town Fridge deliveries." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "..", children: (0, jsx_runtime_1.jsx)("button", { children: "Home Chef Home" }) })] }));
        }
    };
    var renderDocumentBtns = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "col", children: [(0, jsx_runtime_1.jsx)(TextButton_1.default, { to: signLink, buttonText: "Sign the Volunteer Agreement", descriptionText: agreementDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: exports.FOOD_HANDLER_URL, buttonText: "Apply for your Food Handler Ceritifcation", descriptionText: applyDescription, outside: true }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "upload-food-handler", buttonText: "Upload Your Food Handler Certification", descriptionText: uploadDescription })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Home Chef Onboarding" }), renderActive(), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "orientation-video", buttonText: "Watch the Orientation Video and Take the Home Chef Quiz", descriptionText: videoDescription }), (userInfo === null || userInfo === void 0 ? void 0 : userInfo.homeChefStatus) !== 'Active' && renderDocumentBtns()] })] }));
};
exports.default = HomeChefOnboarding;
