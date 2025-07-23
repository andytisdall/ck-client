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
var date_fns_tz_1 = require("date-fns-tz");
var react_redux_1 = require("react-redux");
var alertSlice_1 = require("../../../state/apis/slices/alertSlice");
var Loading_1 = __importDefault(require("../../reusable/loading/Loading"));
var textApi_1 = require("../../../state/apis/textApi");
require("./RecurringConsole.css");
var RecurringConsole = function () {
    var _a = (0, textApi_1.useGetScheduledTextsQuery)(), scheduledTexts = _a.data, isFetching = _a.isFetching;
    var _b = __read((0, textApi_1.useDeleteScheduledTextMutation)(), 2), deleteScheduledText = _b[0], deleteScheduledTextResult = _b[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    if (isFetching || deleteScheduledTextResult.isLoading) {
        return (0, jsx_runtime_1.jsx)(Loading_1.default, {});
    }
    if (!isFetching && scheduledTexts && !Object.keys(scheduledTexts).length) {
        return (0, jsx_runtime_1.jsx)("p", { children: "No scheduled texts found" });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Upcoming Texts" }), (0, jsx_runtime_1.jsx)("ul", { children: !!scheduledTexts &&
                    Object.keys(scheduledTexts).map(function (key) {
                        return ((0, jsx_runtime_1.jsxs)("li", { className: "scheduled-text", children: ["Created On:", ' ', (0, date_fns_tz_1.format)(new Date(scheduledTexts[key][0].dateCreated), 'MM/dd/yy'), (0, jsx_runtime_1.jsx)("p", { children: scheduledTexts[key][0].body }), (0, jsx_runtime_1.jsxs)("p", { children: ["Status: ", scheduledTexts[key][0].status] }), (0, jsx_runtime_1.jsx)("button", { className: "cancel", onClick: function () {
                                        deleteScheduledText(scheduledTexts[key].map(function (text) { return text.sid; }))
                                            .unwrap()
                                            .then(function () { return dispatch((0, alertSlice_1.setAlert)('Message Canceled')); });
                                    }, children: "cancel" })] }, key));
                    }) })] }));
};
exports.default = RecurringConsole;
