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
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var homeChefApi_1 = require("../../../state/apis/volunteerApi/homeChefApi");
var NotificationForm_1 = __importDefault(require("./NotificationForm"));
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var HomeChefNotification = function () {
    var _a = __read((0, homeChefApi_1.useSendHomeChefNotificationMutation)(), 2), sendHomeChefNotification = _a[0], isLoading = _a[1].isLoading;
    var _b = (0, homeChefApi_1.useGetHomeChefNotificationsQuery)(), pastNotifications = _b.data, pastLoading = _b.isLoading;
    var renderPastNotifications = function () {
        if (pastNotifications) {
            return pastNotifications.map(function (notification) {
                return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-delete-user", children: [(0, jsx_runtime_1.jsx)("strong", { children: (0, date_fns_1.format)(new Date(notification.date), 'M/d/yy h:mm a') }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Title:" }), " ", notification.payload.title] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Message:" }), " ", notification.payload.body] })] }, notification.id));
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["Send a ", (0, jsx_runtime_1.jsx)("span", { className: "admin-app-name", children: "Home Chef App" }), " Push Notification"] }), (0, jsx_runtime_1.jsx)(NotificationForm_1.default, { onSubmit: sendHomeChefNotification, isLoading: isLoading }), pastLoading ? (0, jsx_runtime_1.jsx)(Loading_1.default, {}) : renderPastNotifications()] }));
};
exports.default = HomeChefNotification;
