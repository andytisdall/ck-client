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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
require("./Invite.css");
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var authApi_1 = require("../../../state/apis/authApi");
var Invite = function () {
    var _a = __read((0, homeChefApi_1.useSendInviteMutation)(), 2), sendInvite = _a[0], isLoading = _a[1].isLoading;
    var userInfo = (0, authApi_1.useGetUserInfoQuery)().data;
    var defaultMessage = "Hi, this is ".concat(userInfo === null || userInfo === void 0 ? void 0 : userInfo.firstName, ". I want to tell you about a great way to directly help the people in our Oakland community.\n \nI'm a member of the Community Kitchens Home Chef program.  Home chefs cook delicious, restaurant quality meals in bulk at home. Using packaging materials provided by Community Kitchens, we bring these meals to one of the publicly accessible town fridges in Oakland, to be eaten by whoever needs them.\n\nCommunity Kitchens lets community members know when and what kind of food drop offs are happening, and gives home chefs a donation receipt for tax deductions. They also organize the distribution of meals and help chefs work together to get what they need to produce nutritious meals.\n\nCK Home Chef lets people provide food directly to the people that need it most. If you want to know more, you can visit https://www.ckoakland.org/volunteer.\n\nThanks for your time!\n").concat(userInfo === null || userInfo === void 0 ? void 0 : userInfo.firstName, "\n  ");
    var defaultSubject = "".concat(userInfo === null || userInfo === void 0 ? void 0 : userInfo.firstName, " ").concat(userInfo === null || userInfo === void 0 ? void 0 : userInfo.lastName, " invites you to become a home chef!");
    var _b = __read((0, react_1.useState)([""]), 2), recipients = _b[0], setRecipients = _b[1];
    var _c = __read((0, react_1.useState)(defaultSubject), 2), subject = _c[0], setSubject = _c[1];
    var _d = __read((0, react_1.useState)(defaultMessage), 2), message = _d[0], setMessage = _d[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var renderInputs = function () {
        return recipients.map(function (rec, i) {
            return ((0, jsx_runtime_1.jsxs)("li", { className: "form-horizontal", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", value: rec, required: true, className: "invite-email", onChange: function (e) {
                            setRecipients(__spreadArray(__spreadArray(__spreadArray([], __read(recipients.slice(0, i)), false), [
                                e.target.value
                            ], false), __read(recipients.slice(i + 1)), false));
                        } }), i > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "invite-delete-section", onClick: function () { return deleteField(i); }, children: "x" })) : null] }, "emailRecipient" + i));
        });
    };
    var onSubmit = function (e) {
        e.preventDefault();
        sendInvite({ recipients: recipients, message: message, subject: subject })
            .unwrap()
            .then(function () { return navigate(".."); });
    };
    var addField = function () {
        var newArr = __spreadArray(__spreadArray([], __read(recipients), false), [""], false);
        setRecipients(newArr);
    };
    var deleteField = function (i) {
        recipients.splice(i, 1);
        setRecipients(__spreadArray([], __read(recipients), false));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Send your friends an invitation to be a CK Home Chef" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, className: "invite-form", children: [(0, jsx_runtime_1.jsx)("h4", { children: "Enter the email address of the person(s) you're inviting" }), (0, jsx_runtime_1.jsx)("ul", { children: renderInputs() }), (0, jsx_runtime_1.jsx)("div", { className: "invite-add-section", onClick: addField, children: "+ Add another email address" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "subject", children: "Subject:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "subject", value: subject, onChange: function (e) { return setSubject(e.target.value); }, required: true }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "body", children: "Body:" }), (0, jsx_runtime_1.jsx)("textarea", { id: "body", className: "invite-textarea", value: message, onChange: function (e) { return setMessage(e.target.value); }, required: true }), isLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : (0, jsx_runtime_1.jsx)("input", { type: "submit", value: "Submit" })] })] }));
};
exports.default = Invite;
