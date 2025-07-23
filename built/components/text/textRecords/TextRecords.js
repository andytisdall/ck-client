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
var react_1 = require("react");
var date_fns_tz_1 = require("date-fns-tz");
require("./TextRecords.css");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var authApi_1 = require("../../../state/apis/authApi");
var textApi_1 = require("../../../state/apis/textApi");
var TextRecords = function () {
    var _a = __read((0, react_1.useState)((0, date_fns_tz_1.format)(new Date(), "yyyy-MM-dd")), 2), startDate = _a[0], setStartDate = _a[1];
    var _b = __read((0, react_1.useState)(""), 2), userId = _b[0], setUserId = _b[1];
    var users = (0, authApi_1.useGetAllUsersQuery)().data;
    var textRecords = (0, textApi_1.useGetTextRecordsQuery)({
        startDate: startDate.toString(),
    }).data;
    var filteredRecords = (0, react_1.useMemo)(function () {
        if (textRecords && users) {
            return textRecords
                .filter(function (rec) {
                if (userId) {
                    return rec.sender === userId;
                }
                return true;
            })
                .map(function (rec) {
                var _a;
                return ((0, jsx_runtime_1.jsxs)("div", { className: "text-record", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-record-header", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, date_fns_tz_1.format)(new Date(rec.date), "eee M-d-yy h:mm a") }), (0, jsx_runtime_1.jsxs)("div", { children: ["Sent by:", " ", rec.sender === "salesforce"
                                            ? "Salesforce"
                                            : (_a = users[rec.sender]) === null || _a === void 0 ? void 0 : _a.username] }), (0, jsx_runtime_1.jsxs)("div", { children: ["To: ", rec.region] })] }), (0, jsx_runtime_1.jsx)("div", { children: rec.message }), !!rec.image && ((0, jsx_runtime_1.jsx)("a", { href: rec.image, target: "blank", children: (0, jsx_runtime_1.jsx)("button", { children: "View Image" }) }))] }, rec.id));
            });
        }
    }, [textRecords, userId, users]);
    var renderTextRecords = function () {
        if (!textRecords || !users) {
            return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
        }
        if (!(textRecords === null || textRecords === void 0 ? void 0 : textRecords.length)) {
            return (0, jsx_runtime_1.jsx)("div", { children: "No outgoing texts found for the specified start date." });
        }
        return filteredRecords;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-alert-header", children: [(0, jsx_runtime_1.jsx)("label", { children: "Start Date:" }), (0, jsx_runtime_1.jsx)("input", { type: "date", value: startDate, onChange: function (e) {
                            return setStartDate((0, date_fns_tz_1.format)(new Date(e.target.value), "yyyy-MM-dd"));
                        } }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Sent By:" }), users && ((0, jsx_runtime_1.jsxs)("select", { onChange: function (e) { return setUserId(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "All Users" }), Object.values(users)
                                        .sort(function (a, b) { return (a.username > b.username ? 1 : -1); })
                                        .map(function (user) { return ((0, jsx_runtime_1.jsx)("option", { value: user.id, children: user.username }, user.id)); })] }))] }), !!filteredRecords && ((0, jsx_runtime_1.jsxs)("div", { children: ["Number of alerts: ", filteredRecords.length] }))] }), renderTextRecords()] }));
};
exports.default = TextRecords;
