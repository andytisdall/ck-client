"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var TextButton_1 = __importDefault(require("../../reusable/TextButton"));
require("./Resources.css");
var recipesDescription = "Browse the CK recipe library, featuring dishes from some of Oakland's most beloved restaurants and some of our top home chefs, or add a recipe of your own.";
var slackDescription = 'Our Slack channel is a message board where Home Chefs can ask questions, share info, and communicate with Community Kitchens staff.';
var labelDescription = 'Print out labels to put on your meal packaging.';
var ResourcesList = function () {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "resources", children: [(0, jsx_runtime_1.jsxs)("div", { className: "resources-list", children: [(0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "recipes", buttonText: "Recipes", descriptionText: recipesDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "labels", buttonText: "Label Templates", descriptionText: labelDescription }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { to: "https://join.slack.com/t/community-kitchens/shared_invite/zt-27qcrhzdc-Fn0AZbI1auiiymFId9sYjw", buttonText: "Get Connected to our Slack Channel", descriptionText: slackDescription, outside: true })] }), (0, jsx_runtime_1.jsx)("img", { className: "resources-image", src: "/images/home-chef/croissants.jpg", alt: "Croissant and Omelet" })] }));
};
exports.default = ResourcesList;
