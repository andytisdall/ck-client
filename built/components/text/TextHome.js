"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var TextButton_1 = __importDefault(require("../reusable/TextButton"));
var authApi_1 = require("../../state/apis/authApi");
var textAlertDescription = "Send out a text message to one of the subscriber lists, using a pre-written template, to let people know there's been a food dropoff at a town fridge.";
var customAlertDescription = "Send a text message to one of the lists or an individual phone number, not using a template.";
var addNumberDescription = "Add a number to one of the subscriber lists, or delete the number from the lists.";
var feedbackDescription = "See the messages that people text back to our alert numbers.";
var textRecordsDescription = "View past text alerts";
var TextHome = function () {
    var user = (0, authApi_1.useGetUserQuery)().data;
    if (!(user === null || user === void 0 ? void 0 : user.admin)) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "text-main", children: (0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: "Send a Custom Alert", descriptionText: customAlertDescription, to: "send-custom-text" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "text-main", children: [(0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: "Send a Town Fridge Delivery Alert", descriptionText: textAlertDescription, to: "send-text" }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: "Send a Custom Alert", descriptionText: customAlertDescription, to: "send-custom-text" }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: "Add or Remove a Phone Number", descriptionText: addNumberDescription, to: "phone" }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: "Review Feedback", descriptionText: feedbackDescription, to: "feedback" }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: "Text Alert Records", descriptionText: textRecordsDescription, to: "text-records" }), (0, jsx_runtime_1.jsx)(TextButton_1.default, { buttonText: "Upcoming Text", descriptionText: "Review texts that are scheduled to be sent", to: "recurring" })] }));
};
exports.default = TextHome;
