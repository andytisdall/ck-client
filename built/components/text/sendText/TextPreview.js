"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_tz_1 = require("date-fns-tz");
var TextPreview = function (_a) {
    var onSubmit = _a.onSubmit, message = _a.message, region = _a.region, photo = _a.photo, onCancel = _a.onCancel, number = _a.number, sendAt = _a.sendAt;
    var getSrc = function () {
        if (photo) {
            if (typeof photo !== 'string') {
                return URL.createObjectURL(photo);
            }
            return photo;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Confirm Your Message:" }), (0, jsx_runtime_1.jsx)("div", { className: "text-preview", children: message }), photo && (0, jsx_runtime_1.jsx)("img", { className: "photo-preview", src: getSrc(), alt: "preview" }), (0, jsx_runtime_1.jsxs)("div", { children: [!!region && (0, jsx_runtime_1.jsxs)("p", { children: ["Region: ", region] }), (0, jsx_runtime_1.jsxs)("p", { children: ["To: ", !!number ? number : 'All Subscribers in this Region'] })] }), sendAt && ((0, jsx_runtime_1.jsxs)("p", { children: ["Scheduled to send at ", (0, date_fns_tz_1.format)(new Date(sendAt), 'MM/dd/yy hh:mm a')] })), (0, jsx_runtime_1.jsx)("button", { className: "send-btn", onClick: function () {
                    onSubmit();
                }, children: "Send Message" }), (0, jsx_runtime_1.jsx)("button", { className: "send-btn cancel", onClick: function () {
                    onCancel();
                }, children: "Go Back to Text Compose" })] }));
};
exports.default = TextPreview;
