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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var date_fns_tz_1 = require("date-fns-tz");
var textApi_1 = require("../../../state/apis/textApi");
var TextSuccess = function () {
    var _a = __read((0, textApi_1.useSendTextMutation)({
        fixedCacheKey: 'sent-text',
    }), 2), sendTextResult = _a[1];
    var message = sendTextResult.data;
    if (message) {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Success!" }), (0, jsx_runtime_1.jsxs)("div", { className: "file-success", children: [(0, jsx_runtime_1.jsx)("p", { children: "You have successfully sent this text:" }), (0, jsx_runtime_1.jsx)("p", { children: message.message }), !message.number ? ((0, jsx_runtime_1.jsxs)("p", { children: ["Region: ", message.region] })) : ((0, jsx_runtime_1.jsxs)("p", { children: ["Number: ", message.number] })), message.sendAt && ((0, jsx_runtime_1.jsxs)("p", { children: ["This message will be sent at", ' ', (0, date_fns_tz_1.format)(new Date(message.sendAt), 'MM/dd/yy hh:mm a')] })), message.photoUrl && ((0, jsx_runtime_1.jsx)("img", { src: message.photoUrl, alt: "attached", className: "photo-preview" }))] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "../", children: (0, jsx_runtime_1.jsx)("button", { children: "Back to Text Home" }) })] }));
    }
    else {
        return (0, jsx_runtime_1.jsx)("h4", { children: "Message Not Found" });
    }
};
exports.default = TextSuccess;
