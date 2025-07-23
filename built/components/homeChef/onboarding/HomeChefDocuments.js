"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOOD_HANDLER_URL = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TextButton_1 = __importDefault(require("../../reusable/TextButton"));
exports.FOOD_HANDLER_URL = 'https://premierfoodsafety.com/food-handlers-card/california';
var agreementDescription = 'Read and e-sign our volunteer agreement through Docusign.';
var uploadDescription = 'Once you have received your food handler certification, upload the document here.';
var applyDescription = 'Follow this link to start the process of receiving your food handler certification.';
var HomeChefDocuments = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { id: "home-chef-documents", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Upload Your Documents" }), (0, jsx_runtime_1.jsxs)("div", { className: "col", children: [(0, jsx_runtime_1.jsx)(TextButton_1.default, { to: exports.FOOD_HANDLER_URL, buttonText: "Apply for your Food Handler Ceritifcation", descriptionText: applyDescription, outside: true }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "../upload-food-handler", buttonText: "Upload Your Food Handler Certification", descriptionText: uploadDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "../docusign/sign/HC", buttonText: "Sign the Volunteer Agreement", descriptionText: agreementDescription })] })] }));
};
exports.default = HomeChefDocuments;
