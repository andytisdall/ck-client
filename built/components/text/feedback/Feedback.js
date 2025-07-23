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
exports.formatNumber = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var textApi_1 = require("../../../state/apis/textApi");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
require("./Feedback.css");
var CustomText_1 = __importDefault(require("../customText/CustomText"));
var formatNumber = function (num) {
    return (num.substring(2, 5) + '-' + num.substring(5, 8) + '-' + num.substring(8));
};
exports.formatNumber = formatNumber;
var Feedback = function () {
    var _a = __read((0, react_1.useState)('7'), 2), dateRange = _a[0], setDateRange = _a[1];
    var _b = __read((0, react_1.useState)(), 2), replyTo = _b[0], setReplyTo = _b[1];
    var feedbackQuery = (0, textApi_1.useGetFeedbackQuery)();
    var feedback = feedbackQuery.data;
    var _c = __read((0, textApi_1.useDeleteFeedbackMutation)(), 2), deleteFeedback = _c[0], deleteFeedbackResult = _c[1];
    var regions = {
        EAST_OAKLAND: 'East Oakland',
        WEST_OAKLAND: 'West Oakland',
    };
    var renderDateSelector = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Get all feedback since:" }), (0, jsx_runtime_1.jsxs)("select", { value: dateRange, onChange: function (e) { return setDateRange(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "1", children: "1 Day Ago" }), (0, jsx_runtime_1.jsx)("option", { value: "7", children: "1 Week Ago" }), (0, jsx_runtime_1.jsx)("option", { value: "30", children: "1 Month Ago" }), (0, jsx_runtime_1.jsx)("option", { value: "all", children: "All Time" })] })] }));
    };
    var renderResponse = function (fb) {
        var _a;
        if ((_a = fb.response) === null || _a === void 0 ? void 0 : _a.length) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "feedback", children: [(0, jsx_runtime_1.jsx)("h4", { children: "CK Response:" }), (0, jsx_runtime_1.jsx)("div", { className: "feedback-response", children: fb.response.map(function (response, i) {
                            return ((0, jsx_runtime_1.jsx)("ul", { children: (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, date_fns_1.format)(new Date(response.date), 'M/d/yy h:m a') }), (0, jsx_runtime_1.jsx)("div", { children: response.message })] }) }, response.date));
                        }) })] }));
        }
    };
    var renderFeedback = function () {
        if (feedback) {
            return Object.values(feedback)
                .filter(function (fb) {
                if (dateRange === 'all') {
                    return fb;
                }
                else {
                    return new Date(fb.date) > (0, date_fns_1.subDays)(new Date(), parseInt(dateRange));
                }
            })
                .sort(function (a, b) { return (a.date > b.date ? -1 : 1); })
                .map(function (fb) {
                return ((0, jsx_runtime_1.jsxs)("li", { className: "feedback-item", children: [(0, jsx_runtime_1.jsxs)("div", { className: "feedback-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "feedback-line", children: (0, jsx_runtime_1.jsx)("span", { className: "feedback-field", children: (0, date_fns_1.format)(new Date(fb.date), 'MM/dd/yy hh:mm a') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "feedback-line", children: [(0, jsx_runtime_1.jsx)("span", { className: "feedback-field", children: "Region:" }), ' ', regions[fb.region]] }), (0, jsx_runtime_1.jsxs)("div", { className: "feedback-line", children: [(0, jsx_runtime_1.jsx)("span", { className: "feedback-field", children: "Sent by:" }), ' ', (0, exports.formatNumber)(fb.sender)] })] }), (0, jsx_runtime_1.jsx)("div", { className: "feedback-section", children: !!fb.message && (0, jsx_runtime_1.jsx)("p", { children: fb.message }) }), (0, jsx_runtime_1.jsx)("div", { className: "feedback-section", children: renderResponse(fb) }), (0, jsx_runtime_1.jsx)("div", { className: "feedback-section", children: fb.images.map(function (i) { return ((0, jsx_runtime_1.jsx)("img", { src: i, alt: "attached" }, i)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "feedback-section", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return setReplyTo(fb); }, children: "Respond to this Message" }), (0, jsx_runtime_1.jsx)("button", { className: "feedback-delete cancel", onClick: function () {
                                        deleteFeedback(fb.id);
                                    }, children: "Delete" })] })] }, fb.id));
            });
        }
    };
    var renderCustomText = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(CustomText_1.default, { replyTo: replyTo }), (0, jsx_runtime_1.jsx)("button", { className: "feedback-cancel cancel", onClick: function () { return setReplyTo(undefined); }, children: "Cancel" })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Feedback" }), replyTo ? (renderCustomText()) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [renderDateSelector(), (0, jsx_runtime_1.jsxs)("ul", { className: "feedback-list", children: [feedbackQuery.isLoading || deleteFeedbackResult.isLoading ? ((0, jsx_runtime_1.jsx)(Loading_1.default, {})) : (!!feedback && renderFeedback()), !!feedback &&
                                !Object.values(feedback).length &&
                                'No Feedback to Show.'] })] }))] }));
};
exports.default = Feedback;
